// // index.js
// const express = require('express');
// const morgan = require('morgan');
// const app = express();

// app.use(express.json());

// // log requests including POST body
// morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '');
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// let notes = [1, 2, 3, 4, 5];

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.post('/api/notes', (req, res) => {
//   const note = req.body;
//   notes.push(note);
//   res.json(note);
// });

// app.delete('/api/notes/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   notes = notes.filter(note => note !== id);
//   res.status(204).end();
// });

// app.listen(3000, () => {
//   console.log('✅ Server running on http://localhost:3000');
// });






const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

