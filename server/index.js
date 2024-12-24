import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectdb from './config/db.js';
import morgan from 'morgan';

dotenv.config();


const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Connect to MongoDB
connectdb();

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});

