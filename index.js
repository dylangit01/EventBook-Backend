import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// Taking incoming requests and set limits by using express body-parser.
app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
/*
a. express.json() is a method inbuilt in express to recognize the incoming Requests where the Content-Type:
 application/json header is present and transforms the text-based JSON input into object under req.body.
b. express.urlencoded() is a method inbuilt in express to recognize the incoming URL-encoded requests, where the value can be a string or array (when extended is false), or any type (when extended is true).
c. Body-parser must be placed before routes, so that body-parser can be applied, otherwise data cannot be written into database
*/

app.use(cors());  // cors has to be placed before routes and add "proxy" :"http://localhost:5000" in Client Side package.json file

app.use('/posts', postRoutes);
// console.log(process.env.CONNECTION_URL);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Event-Book API is running successfully')
});

// Connect data with real database by using mongoDB
// const CONNECTION_URL = 'mongodb+srv://dylan01:dylan01@cluster0.rk0ev.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log(err.message));

mongoose.set('useFindAndModify', false);
