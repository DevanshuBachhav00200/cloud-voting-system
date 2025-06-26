import express from 'express';
import cors from 'cors';
import { Firestore, FieldValue } from '@google-cloud/firestore';

const app = express();
app.use(cors());
app.use(express.json());

const db = new Firestore();
const votesCollection = db.collection('votes');

app.get('/votes', async (req, res) => {
    try {
        const snapshot = await votesCollection.get();
        const votes = [];
        snapshot.forEach(doc => {
            votes.push({ id: doc.id, ...doc.data() });
        });
        res.json(votes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch votes', details: err.message });
    }
});

app.post('/vote', async (req, res) => {
    try {
        const { option } = req.body;
        if (!option) return res.status(400).json({ error: 'Option is required' });

        const docRef = votesCollection.doc(option);
        const doc = await docRef.get();

        if (!doc.exists) return res.status(404).json({ error: 'Option does not exist in Firestore' });

        await docRef.update({
            count: FieldValue.increment(1)
        });

        res.json({ message: `Vote recorded for ${option}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to cast vote', details: err.message });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
