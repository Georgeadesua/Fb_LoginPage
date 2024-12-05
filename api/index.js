import express from 'express';
import bodyParser from 'body-parser';
import { db } from '../firebase'; // Import db from your firebase module

const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Save to Firebase
        await db.collection('formSubmissions').add({
            email,
            password,
            timestamp: new Date().toISOString(),
        });
        res.status(200).send('<h1>Form submitted successfully!</h1><a href="/">Back to Home</a>');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
