
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './AddNotes.jsx'; // lub './Notes.tsx' jeśli używasz TypeScript

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
