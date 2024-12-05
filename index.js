import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables for local development
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
async function connectDb() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI, // Access environment variable on Vercel
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      }
    );
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectDb();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = mongoose.model('User', new mongoose.Schema({ email: String, password: String }));

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
