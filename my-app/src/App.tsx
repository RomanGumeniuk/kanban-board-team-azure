import React from "react";
import "./App.css";
import {
  Container,
  Heading,
  SimpleGrid,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DarkModeIconButton from "./components/DarkMode/DarkModeIcon.tsx";
import Notes from "./AddNotes.tsx";
import { ColumnType } from "./utils/enums.ts";
import Column from "./components/Column/Column.tsx";

// Define a custom theme with a larger base font size
const theme = extendTheme({
  styles: {
    global: {
      fontSize: "18px", // Adjust this value to your needs
    },
  },
});

const App: React.FC = () => (
  <ChakraProvider theme={theme}>
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
                bgGradient="linear(to-b, #0D2137,  #00FF7F)"
                bgClip="text"
                mt={2}
              >
                KRAP Kanban Board
                <DarkModeIconButton pos="absolute" top={0} right={2} m="1rem" />
              </Heading>

              <Container maxWidth={"container.lg"} px={4} py={10}>
                <SimpleGrid
                  columns={{ base: 1, md: 4 }} //resize options for columns
                  spacing={{ base: 16, md: 5 }}
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
  </ChakraProvider>
);

export default App;
