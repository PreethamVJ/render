const express = require('express');
const app = express();

app.use(express.json());

let notes = [1, 2, 3, 4, 5];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/notes', (req, res) => {
  const note = req.body;
  console.log('📥 Received:', note);
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note !== id);
  res.status(204).end();
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
