
// /src/App.tsx
import React from 'react';
import './App.css'; // Styl ogólny dla całej aplikacji
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Notes from './AddNotes.jsx';
import NoteContainer from './components/NoteContainer/NoteContainer';

const App: React.FC = () => (
  <div id="main-div">
    <Banner />
    <NoteContainer title="To Do" />
    <NoteContainer title="In Progress" />
    <NoteContainer title="For Review"/>
    <NoteContainer title="Done" />
    //przykładowe dla testu ddziałania
    <Router>
      <Routes>
        <Route path="/notes" element={<Notes />} />
        {/* Możesz dodać więcej tras tutaj */}
      </Routes>
    </Router>
  </div>
);

export default App;
