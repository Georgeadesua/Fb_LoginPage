import { connectToDatabase } from '../mongodb/mongodb.js';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            const db = await connectToDatabase();
            const collection = db.collection('formSubmissions');

            await collection.insertOne({
                email,
                password,
                timestamp: new Date(),
            });

            res.status(200).json({ message: 'Form submitted successfully!' });
        } catch (error) {
            console.error('Error saving form data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
