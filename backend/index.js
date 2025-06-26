const express = require('express');
const cors = require('cors');
const { Firestore } = require('@google-cloud/firestore');

const app = express();
const port = process.env.PORT || 8080;

// ✅ Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// ✅ Initialize Firestore
const firestore = new Firestore();

// ✅ POST /vote – Save vote to Firestore
app.post('/vote', async (req, res) => {
  const { option } = req.body;
  const docRef = firestore.collection('votes').doc(option);

  try {
    await docRef.set({ count: Firestore.FieldValue.increment(1) }, { merge: true });
    res.status(200).send('Vote recorded');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error recording vote');
  }
});

// ✅ GET /results – Fetch vote counts
app.get('/results', async (req, res) => {
  try {
    const snapshot = await firestore.collection('votes').get();
    const results = {};
    snapshot.forEach(doc => {
      results[doc.id] = doc.data().count || 0;
    });
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching results');
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
