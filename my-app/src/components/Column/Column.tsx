import { AddIcon } from "@chakra-ui/icons";
import mockData from "../../data/mockData.json";
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
import { useState } from "react";
import { ColumnType } from "../../utils/enums";
import Task from "../Task/Task";
import { TaskModel } from "../../utils/models";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import AddTaskModal from "./AddTaskModal";

const ColumnColorScheme: Record<ColumnType, string> = {
  TO_DO: "gray",
  IN_PROGRESS: "yellow",
  FOR_REVIEW: "blue",
  COMPLETED: "green",
};

function Column({ column }: { column: ColumnType }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const stackDirection = useBreakpointValue({
    base: "row",
    md: "column",
  }) as StackDirection;

  //Zmiana koloru scrolla
  const simpleBarColor = useColorModeValue("lightColor", "darkColor");
  const ColumnTasks = mockData.tasks
    .filter((task) => task.column === column)
    .map((task, index) => {
      let column: ColumnType;
      switch (task.column) {
        case "TO_DO":
          column = ColumnType.TO_DO;
          break;
        case "IN_PROGRESS":
          column = ColumnType.IN_PROGRESS;
          break;
        case "FOR_REVIEW":
          column = ColumnType.FOR_REVIEW;
          break;
        case "COMPLETED":
          column = ColumnType.COMPLETED;
          break;
        default:
          throw new Error(`Invalid column type: ${task.column}`);
      }

      const mappedTask: TaskModel = { ...task, column };

      return <Task key={mappedTask.id} task={mappedTask} index={index} />;
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
            maxHeight: 600,
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
