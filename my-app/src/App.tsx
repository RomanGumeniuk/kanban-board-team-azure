import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import {
  Container,
  SimpleGrid,
  ChakraProvider,
  extendTheme,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ColumnType } from "./utils/enums";
import Column from "./components/Column/Column";
import Header from "./components/Header/Header";
import kanbanService from "./services/KanbanService";
import { TaskModel } from "./utils/models";
import { Helmet } from "react-helmet";

const theme = extendTheme({
  styles: {
    global: {
      fontSize: "18px",
    },
  },
});

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await kanbanService.showAllTasks();
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <ChakraProvider theme={theme}>
      <div id="main-div">
        <Helmet>
          <meta
            name="description"
            content="A Kanban board application built with React and TypeScript, styled with Chakra UI, powered by C# Azure Functions, and hosted on Azure Blob Storage."
          />
        </Helmet>
        <Header />
        <Container maxWidth={"container.lg"} px={4} py={10}>
          {error && (
            <Alert status="error">
              <AlertIcon />
              Error: {error}
            </Alert>
          )}
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
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
