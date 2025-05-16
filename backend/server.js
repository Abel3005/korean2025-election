const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Candidate = require('./models/candidate');

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/candidates', async (req, res) => {
  const data = await Candidate.find();
  res.json(data);
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://35.238.135.152:${process.env.PORT}`)
);
