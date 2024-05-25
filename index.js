const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const DBConnection = require('./src/db/dbconnection');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
DBConnection();
// Meme schema and model
const memeSchema = new mongoose.Schema({
  imagePath: String,
  text: String,
});

const Meme = mongoose.model('Meme', memeSchema);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
app.post('/addmeme', upload.single('image'), async (req, res) => {
  const { text } = req.body;
  const imagePath = path.join('uploads', req.file.filename);

  const newMeme = new Meme({
    imagePath,
    text,
  });

  try {
    await newMeme.save();
    res.send('Meme uploaded successfully!');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/getmemes', async (req, res) => {
  try {
    const memes = await Meme.find({});
    res.send(memes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
