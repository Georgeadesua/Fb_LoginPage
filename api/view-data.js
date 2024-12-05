// /api/view-data.js
import { db } from '../firebase';

export default async function handler(req, res) {
    const auth = { login: 'admin', password: 'secret12' };

    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login === auth.login && password === auth.password) {
        try {
            const snapshot = await db.collection('formSubmissions').get();
            let formSubmissions = snapshot.docs.map(doc => doc.data());

            let htmlContent = '<h1>Secured Data</h1>';
            if (formSubmissions.length === 0) {
                htmlContent += '<p>No data available yet.</p>';
            } else {
                htmlContent += '<ul>';
                formSubmissions.forEach((submission, index) => {
                    htmlContent += `<li><strong>Entry ${index + 1}:</strong> Email: ${submission.email}, Password: ${submission.password}</li>`;
                });
                htmlContent += '</ul>';
            }

            res.status(200).send(htmlContent);
        } catch (error) {
            console.error('Error fetching form data:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('Authentication required.');
    }
}
