import React from "react";
import "./App.css"; // Styl ogólny dla całej aplikacji
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DarkModeIconButton from "./components/DarkMode/DarkModeIcon.tsx";
import Notes from "./AddNotes.jsx";
import NoteContainer from "./components/NoteContainer/NoteContainer";
import { ColumnType } from "./utils/enums.ts";
import Column from "./components/Column/Column.tsx";

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/notes" element={<Notes />} />
      <Route
        path="/"
        element={
          <div id="main-div">
            <Heading
              fontSize={{ base: "4xl", sm: "5xl", md: "8xl" }}
              fontWeight="bold"
              textAlign="center"
              bgGradient="linear(to-l, #0D2137,  #00FF7F)"
              bgClip="text"
              mt={2}
            >
              Kanban Board
              <DarkModeIconButton position="absolute" top={0} right={2} />
            </Heading>
            {/* <NoteContainer title="To Do" />
            <NoteContainer title="In Progress" />
            <NoteContainer title="For Review" />
            <NoteContainer title="Done" /> */}

            <Container maxWidth={"container.lg"} px={4} py={10}>
              <SimpleGrid
                columns={{ base: 1, md: 4 }}
                spacing={{ base: 16, md: 4 }}
              >
                <Column column={ColumnType.TO_DO} />
                <Column column={ColumnType.IN_PROGRESS} />
                <Column column={ColumnType.FOR_REVIEW} />
                <Column column={ColumnType.COMPLETED} />
              </SimpleGrid>
            </Container>
          </div>
        }
      />
    </Routes>
  </Router>
);

export default App;
