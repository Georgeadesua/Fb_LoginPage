import db from './firebase';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            await db.collection('formSubmissions').add({
                email,
                password,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
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
