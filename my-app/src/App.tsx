import React from "react";
import "./App.css";
import {
  Container,
  SimpleGrid,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { ColumnType } from "./utils/enums.ts";
import Column from "./components/Column/Column.tsx";
import Header from "./components/Header/Header.tsx";

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
    {
      <div id="main-div">
        <Header></Header>
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
  </ChakraProvider>
);

export default App;
