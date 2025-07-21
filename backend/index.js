const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

let notes = [
  { id: 1, content: 'Note one' },
  { id: 2, content: 'Note two' },
  { id: 3, content: 'Note three' },
];

// 🔹 Send notes to frontend
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/notes', (req, res) => {
  const note = {
    id: notes.length + 1,
    content: req.body.content
  };
  notes.push(note);
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
