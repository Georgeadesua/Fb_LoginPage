import mongoose from 'mongoose';

async function connectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://georgeadesua3:sMqHJomGmoG28ene@fbpage.nmeu5.mongodb.net/?retryWrites=true&w=majority&appName=fbPage",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      }
    );
    console.log("MongoDB is connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDb;
