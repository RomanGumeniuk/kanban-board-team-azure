
import Notes from './Notes.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/notes" element={<Notes />} />
        {/* Możesz dodać więcej tras tutaj */}
      </Routes>
    </Router>
  );
}

export default App;