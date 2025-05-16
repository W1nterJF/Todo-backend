import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || '';

// 🔓 CORS ni frontend domeni bilan cheklang yoki "*" bilan oching
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://todo-frontend-one-bay.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Agar frontend cookie bilan ishlatsa
};

app.use(cors(corsOptions));



app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB ga muvaffaqiyatli ulandi');
    app.listen(PORT, () => {
      console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB ulanishda xatolik:', error);
  });

app.get('/', (req, res) => {
  res.send('Salom, To-Do API MongoDB bilan ulandi!');
});

app.use('/api/todos', todoRoutes);
