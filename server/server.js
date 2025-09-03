const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const poemsRouter = require('./routes/poems');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/poetry_blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/poems', poemsRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

