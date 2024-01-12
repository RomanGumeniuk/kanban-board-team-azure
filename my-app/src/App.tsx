// /src/App.tsx
import React from 'react';
import './App.css'; // Styl ogólny dla całej aplikacji
import Banner from './components/Banner/Banner';
import NoteContainer from './components/NoteContainer/NoteContainer';

const App: React.FC = () => (
  <div id='main-div'>
    <Banner />
    <NoteContainer title="To Do" />
    <NoteContainer title="In Progress" />
    <NoteContainer title="For Review"/>
    <NoteContainer title="Done" />
  </div>
);

export default App;
