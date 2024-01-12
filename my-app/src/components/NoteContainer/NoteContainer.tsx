// /src/components/NoteContainer/NoteContainer.tsx
import React, { useState } from 'react';
import './NoteContainer.css';
import Note from '../Note/Note';

interface NoteContainerProps {
  title: string;
}

const NoteContainer: React.FC<NoteContainerProps> = ({ title }) => {
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    if (notes.length < 5) {
      const newNote = {
        id: notes.length + 1,
   //     color: getRandomColor(),
        title: `New Task ${notes.length + 1}`,
      };

      console.log('New Note:', newNote); // Dodaj console.log tutaj

      setNotes([...notes, newNote]);
    } else {
      alert('You can add a maximum of 5 notes.');
    }
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="note-container">
      <div className="notes-box">
        <h2>{title}</h2>
        {notes.map((note) => (
          <Note key={note.id} note={note} onDelete={() => deleteNote(note.id)} />
        ))}
        
        <button className="add-note-button" onClick={addNote}>
          Add new note +
        </button>
      </div>
    </div>
  );
};

export default NoteContainer;
