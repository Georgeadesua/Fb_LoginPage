const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory array to store submissions
let formSubmissions = [];

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { email, password } = req.body;
    formSubmissions.push({ email, password });
    res.send('<h1>Form submitted successfully!</h1><a href="/">Back to Home</a>');
});

// Secure route for viewing data
app.get('/view-data', (req, res) => {
    const auth = { login: 'admin', password: 'secret' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    if (login === auth.login && password === auth.password) {
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
        res.send(htmlContent);
    } else {
        res.set('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('Authentication required.');
    }
});

// Export the app for Vercel
module.exports = app;
