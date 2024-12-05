// /api/submit-form.js
import { connectToDatabase } from '../mongodb/mongodb.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const db = await connectToDatabase();
            const collection = db.collection('formSubmissions');  // 'formSubmissions' collection

            await collection.insertOne({
                email,
                password,
                timestamp: new Date(),
            });

            res.status(200).send('<h1>Form submitted successfully!</h1><a href="/">Back to Home</a>');
        } catch (error) {
            console.error('Error saving form data:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(405).send({ message: 'Method Not Allowed' });
    }
}
