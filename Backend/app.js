
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const queryRouter = require('./routers/queryrouter');

dotenv.config();

const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


const mongodburl = process.env.DATABASE_ACCESS;
// console.log(mongodburl);

const MongodbConnection = async () => {
  try {
    await mongoose.connect(mongodburl, {
      useNewUrlParser: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

MongodbConnection();

const port = process.env.PORT || 5000;

app.use('/', queryRouter);

app.get('/demo', (req, res) => {
  res.send('Hello Dude!');
});

app.listen(port, () => {
  console.log(`The backend is listening at http://localhost:${port}`);
});

