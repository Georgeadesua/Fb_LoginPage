import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectToDatabase } from './mongodb/mongodb.js'; // Correct path

dotenv.config();

const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Root route to serve the main page
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// POST route to handle form submissions
app.post('/submit', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const collection = db.collection('formSubmissions');
        await collection.insertOne({ email, password, timestamp: new Date() });
        res.status(200).send('<h1>Form submitted successfully!</h1><a href="/">Back to Home</a>');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
