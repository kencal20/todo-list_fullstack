import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();
const port: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const db_name: string = process.env.DB_NAME || '';
mongoose.connect(db_name);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error in Connecting to the db'));
db.once('open', () => console.log('Success in connecting to the db'));

app.use('/todolist', require('./routes/todoList'));

app.listen(port, () => console.log(`Your Server is hosted on ${port}`));

