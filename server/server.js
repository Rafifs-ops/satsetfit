import 'dotenv/config'; // Muat environment variables
import express from 'express';
const mongoose = require('mongoose');
import cors from 'cors';

const app = express();
const port = 8080; // Port untuk server

// --- Middleware ---
const corsOptions = {
    origin: ['http://localhost:5173', 'https://fitcal-indonesia.web.app']
};
app.use(cors(corsOptions));
app.use(express.json()); // Mem-parsing body JSON

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Import Routes
const paymentRoutes = require('./routes/payment');
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const dataRoutes = require('./routes/data');
const saveRoutes = require('./routes/save');
const premiumRoutes = require('./routes/premium');

// Use Routes
app.use('/api/create-transaction', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/save', saveRoutes);
app.use('/api/premium', premiumRoutes);

// --- Jalankan Server ---
app.listen(port, () => {
    console.log(`SatSetFit Backend (Express.js) listening on http://localhost:${port}`);
});