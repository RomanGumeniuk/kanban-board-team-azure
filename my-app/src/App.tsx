
import React from "react";
import "./App.css"; // Styl ogólny dla całej aplikacji
import { Container, Heading } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DarkModeIconButton from "./components/DarkMode/DarkModeIcon.tsx";
import Banner from "./components/Banner/Banner";
import Notes from "./AddNotes.jsx";
import NoteContainer from "./components/NoteContainer/NoteContainer";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/notes" element={<Notes />} />
      <Route
        path="/"
        element={
          <div id="main-div">
            <Heading
              fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
              fontWeight="bold"
              textAlign="center"
              bgGradient="linear(to-l, #0D2137,  #00FF7F)"
              bgClip="text"
              mt={2}
            >
              Kanban Board
            </Heading>
            <DarkModeIconButton position="absolute" top={0} right={2} />
            <NoteContainer title="To Do" />
            <NoteContainer title="In Progress" />
            <NoteContainer title="For Review" />
            <NoteContainer title="Done" />
          </div>
        }
      />
    </Routes>
  </Router>
);

export default App;

