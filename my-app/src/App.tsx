import React, { useState, useEffect } from "react";
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
import kanbanService from "./services/KanbanService"; // Import kanbanService
import { TaskModel } from "./utils/models.ts";
import { Helmet } from "react-helmet";

// Define a custom theme with a larger base font size
const theme = extendTheme({
  styles: {
    global: {
      fontSize: "18px", // Adjust this value to your needs
    },
  },
});

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add a state for tasks

  const fetchTasks = () => {
    setIsLoading(true);
    kanbanService
      .showAllTasks()
      .then((response) => response.json())
      .then((data: TaskModel[]) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <div id="main-div">
        <Helmet>
          <meta
            name="description"
            content="A Kanban board application built with React and TypeScript, styled with Chakra UI, powered by C# Azure Functions, and hosted on Azure Blob Storage."
          />
        </Helmet>
        <Helmet>
          <meta
            name="description"
            content="This is a description of my web app."
          />
        </Helmet>
        <Header />
        <Container maxWidth={"container.lg"} px={4} py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 4 }} //resize options for columns
            spacing={{ base: 16, md: 5 }}
          >
            <Column
              column={ColumnType.TO_DO}
              tasks={tasks}
              isLoading={isLoading}
              fetchTasks={fetchTasks}
            />
            <Column
              column={ColumnType.IN_PROGRESS}
              tasks={tasks}
              isLoading={isLoading}
              fetchTasks={fetchTasks}
            />
            <Column
              column={ColumnType.FOR_REVIEW}
              tasks={tasks}
              isLoading={isLoading}
              fetchTasks={fetchTasks}
            />
            <Column
              column={ColumnType.COMPLETED}
              tasks={tasks}
              isLoading={isLoading}
              fetchTasks={fetchTasks}
            />
          </SimpleGrid>
        </Container>
      </div>
    </ChakraProvider>
  );
};

export default App;
