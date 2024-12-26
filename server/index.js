import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectdb from './config/db.js';
import morgan from 'morgan';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
dotenv.config();


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectdb();

// Routes

app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/payment', orderRoutes);


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

