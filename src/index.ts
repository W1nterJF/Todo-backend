import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

app.use(cors());
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
