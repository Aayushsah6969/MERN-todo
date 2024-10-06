import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoute from '../backend/routes/todo.route.js';
import cookieParser from 'cookie-parser';
import userRoute from '../backend/routes/user.route.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 4002;
const DB_URI = process.env.MONGODB_URI;

// Use async/await to connect to MongoDB
(async () => {
  try {
    await mongoose.connect(DB_URI);
    
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection error:", error.message);
  }
})();

app.use(cors({
  origin:'http://localhost:5173',
  credentials: true,  // Indicates that the server requires client-side cookies in order to send requests to the server
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers that the client can send to the server, like 'Content-Type' or 'Authorization'

}))


app.use(cookieParser()); // Use cookie-parser middleware
app.use(express.json());
app.use('/todo', todoRoute);
app.use('/user', userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
