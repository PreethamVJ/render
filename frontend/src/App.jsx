import { useState, useEffect } from 'react'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/api/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = { content: newNote }
    fetch('http://localhost:3001/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteObject),
    })
      .then(response => response.json())
      .then(returnedNote => setNotes(notes.concat(returnedNote)))
    setNewNote('')
  }

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note => <li key={note.id}>{note.content}</li>)}
      </ul>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
