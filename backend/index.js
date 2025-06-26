const express = require('express');
const cors = require('cors');
const { Firestore, FieldValue } = require('@google-cloud/firestore');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const firestore = new Firestore();

app.post('/vote', async (req, res) => {
  const { option } = req.body;

  if (!option) {
    return res.status(400).send('Missing vote option');
  }

  try {
    const docRef = firestore.collection('votes').doc(option);
    await docRef.set({ count: FieldValue.increment(1) }, { merge: true });
    res.status(200).send('Vote recorded');
  } catch (err) {
    console.error('Error in /vote:', err);
    res.status(500).send('Error recording vote');
  }
});

app.get('/results', async (req, res) => {
  try {
    const snapshot = await firestore.collection('votes').get();
    const results = {};
    snapshot.forEach(doc => {
      results[doc.id] = doc.data().count || 0;
    });
    res.status(200).json(results);
  } catch (err) {
    console.error('Error in /results:', err);
    res.status(500).send('Error fetching results');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

