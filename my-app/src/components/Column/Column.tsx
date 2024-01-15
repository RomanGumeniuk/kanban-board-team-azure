import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ColumnType } from "../../utils/enums";
import Task from "../Task/Task";
import { TaskModel } from "../../utils/models";

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: "gray",
  "In Progress": "yellow",
  "For Review": "blue",
  Completed: "green",
};

const mockTasks: TaskModel[] = [
  {
    id: "1",
    title: "Ugotować pierogi",
    column: ColumnType.TO_DO,
    color: "blue.200",
  },
  {
    id: "2",
    title: "Zjeść pierogi (smakuwa)",
    column: ColumnType.TO_DO,
    color: "green.100",
  },
  {
    id: "3",
    title: "Spalić pierogi ćwicząc💪",
    column: ColumnType.TO_DO,
    color: "red.100",
  },
];
function Column({ column }: { column: ColumnType }) {
  const ColumnTasks = mockTasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ));
  return (
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue("gray.600", "gray.500")}
        bgColor={useColorModeValue("gray.100", "gray.700")}
        _hover={{ bgColor: useColorModeValue("gray.300", "gray.600") }}
        py={2}
        variant="solid"
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
      />
      <Stack
        direction={{ base: "row", md: "column" }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue("gray.50", "gray.900")}
        rounded="lg"
        boxShadow="md"
        overflow="auto"
      >
        {ColumnTasks}
      </Stack>
    </Box>
  );
}

export default Column;
