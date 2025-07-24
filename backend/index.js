require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/mongo');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

const mongoUrl = process.env.MONGODB_URI;

// Connect to MongoDB, then start the server
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');

    // 🔁 All routes AFTER successful connection

    app.get('/api/notes', (req, res) => {
      Note.find({}).then(notes => {
        res.json(notes);
      });
    });

    app.post('/api/notes', (req, res) => {
      const { content, important = false } = req.body;
      const note = new Note({ content, important });

      note.save()
        .then(savedNote => res.json(savedNote))
        .catch(err => res.status(500).json({ error: 'Error saving note' }));
    });

    app.delete('/api/notes/:id', (req, res) => {
      const id = req.params.id;
      Note.findByIdAndDelete(id)
        .then(() => res.status(204).end())
        .catch(() => res.status(500).json({ error: 'Delete failed' }));
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });
