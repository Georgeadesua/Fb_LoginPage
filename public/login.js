import mongoose from 'mongoose';

let isDbConnected = false; // To prevent re-initialization of the DB connection

const connectDb = async () => {
  if (!isDbConnected) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isDbConnected = true;
    console.log('MongoDB connected successfully!');
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDb();

    const { email, password } = req.body;
    const User = mongoose.model('User', new mongoose.Schema({ email: String, password: String }));

    const newUser = new User({ email, password });
    await newUser.save();

    return res.status(201).json({ message: 'Login successful. Redirecting...' });
  } catch (error) {
    console.error('Error in /login:', error);
    return res.status(500).json({ message: 'Error saving user data. Please try again later.' });
  }
}
