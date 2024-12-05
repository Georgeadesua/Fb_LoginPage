import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';  // Import MongoDB client

dotenv.config();  // Load environment variables from .env file (if any)

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI; // e.g. mongodb://localhost:27017

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Serve static files (like CSS, images, index.html) from the 'public' directory
app.use(express.static('public'));

// Root route to serve the main page
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// MongoDB connection function
const connectToDatabase = async () => {
    try {
        const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(); // Return the database connection
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

// POST route to handle form submissions
app.post('/api/submit-form', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Connect to MongoDB
        const db = await connectToDatabase();
        
        // Select the database and collection
        const collection = db.collection('formSubmissions');
        
        // Insert form data into MongoDB
        await collection.insertOne({ email, password, timestamp: new Date() });
        
        res.status(200).send('<h1>Form submitted successfully!</h1><a href="/">Back to Home</a>');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send('<h1>Internal Server Error. Try Again!</h1>');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
