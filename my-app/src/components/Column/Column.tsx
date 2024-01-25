import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  StackDirection,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ColumnType } from "../../utils/enums";
import Task from "../Task/Task";
import { TaskModel } from "../../utils/models";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import AddTaskModal from "./AddTaskModal";
import kanbanService from "../../services/KanbanService";

const ColumnColorScheme: Record<ColumnType, string> = {
  TO_DO: "gray",
  IN_PROGRESS: "yellow",
  FOR_REVIEW: "blue",
  COMPLETED: "green",
};

function Column({ column }: { column: ColumnType }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const simpleBarColor = useColorModeValue("lightColor", "darkColor");

  const stackDirection = useBreakpointValue({
    base: "row",
    md: "column",
  }) as StackDirection;

  const [tasks, setTasks] = useState<TaskModel[]>([]);

  function mapColumnNumberToColumnType(columnNumber: number): ColumnType {
    switch (columnNumber) {
      case 1:
        return ColumnType.TO_DO;
      case 2:
        return ColumnType.IN_PROGRESS;
      case 3:
        return ColumnType.FOR_REVIEW;
      case 4:
        return ColumnType.COMPLETED;
      default:
        throw new Error(`Invalid column number: ${columnNumber}`);
    }
  }

  useEffect(() => {
    kanbanService
      .showAllTasks()
      .then((response) => response.json())
      .then((data: TaskModel[]) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const ColumnTasks = tasks
    .filter((task) => mapColumnNumberToColumnType(task.column) === column)
    .map((task, index) => {
      return <Task key={task.id} task={task} index={index} />;
    });

  function formatColumnType(columnType: ColumnType) {
    switch (columnType) {
      case ColumnType.TO_DO:
        return "To do";
      case ColumnType.IN_PROGRESS:
        return "In progress";
      case ColumnType.FOR_REVIEW:
        return "For review";
      case ColumnType.COMPLETED:
        return "Completed";
      default:
        return columnType;
    }
  }
  return (
    <Box>
      <Heading fontSize="md" mb={5} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
          {formatColumnType(column)}
        </Badge>
      </Heading>
      <IconButton
        mb={4}
        onClick={() => setIsOpen(true)}
        size="xs"
        w="full"
        color={useColorModeValue("gray.600", "gray.400")}
        bgColor={useColorModeValue("gray.200", "gray.700")}
        _hover={{ bgColor: useColorModeValue("gray.300", "gray.600") }}
        py={2}
        variant="solid"
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
      />
      <Box
        rounded="lg"
        boxShadow="md"
        overflow="hidden" // hide overflow to respect border radius
        bgColor={useColorModeValue("gray.200", "gray.700")}
      >
        <SimpleBar
          style={{
            height: 580,
            scrollbarColor: `${simpleBarColor} transparent`,
          }}
        >
          <Stack
            direction={stackDirection}
            p={4}
            spacing={4}
            alignItems={"center"}
          >
            {ColumnTasks}
          </Stack>
        </SimpleBar>
      </Box>
      <AddTaskModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Column;
