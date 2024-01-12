// /src/components/Note/Note.tsx
import React from 'react';
import './Note.css';
interface Note {
  id: number;
  color: string;
  title: string;
}

// interface Note {
//     id: number;
//     title: string;
//     description: string;
//   }
  

interface NoteProps {
  note: Note;
  onDelete: () => void;
}

const Note: React.FC<NoteProps> = ({ note, onDelete }) => (
  <div className="note" style={{ backgroundColor: note.color }}>
    <h3>{note.title}</h3>
    <button onClick={onDelete}>Delete</button>
  </div>
);

export default Note;
