import React from 'react';
import './App.css'; // Styl ogólny dla całej aplikacji
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner/Banner';
import Notes from './AddNotes.jsx';
import NoteContainer from './components/NoteContainer/NoteContainer';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/notes" element={<Notes />} />
      <Route path="/" element={
        <div id="main-div">
          <Banner />
          <NoteContainer title="To Do" />
          <NoteContainer title="In Progress" />
          <NoteContainer title="For Review"/>
          <NoteContainer title="Done" />
        </div>
      }/>
    </Routes>
  </Router>
);

export default App;