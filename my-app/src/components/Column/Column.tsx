import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
  Button,
  ModalFooter,
  Spacer,
  Flex,
  useBreakpointValue,
  StackDirection,
} from "@chakra-ui/react";
import { useState } from "react";
import { ColumnType } from "../../utils/enums";
import Task from "../Task/Task";
import { TaskModel } from "../../utils/models";
import axios from "axios";
import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: "gray",
  "In Progress": "yellow",
  "For Review": "blue",
  Completed: "green",
};

async function AddTaskRequest() {
  try {
    const response = await axios.get("https://your-azure-function-url");
    console.log(response.data);
  } catch (error) {
    console.error("Error calling Azure Function:", error);
    return 0;
  }
}

const mockTasks: TaskModel[] = [
  {
    id: "1",
    title: "Ugotować pierogi",
    column: ColumnType.TO_DO,
    color: "red.300",
  },
  {
    id: "2",
    title: "Zjeść pierogi (smakuwa)",
    column: ColumnType.TO_DO,
    color: "green.300",
  },
  {
    id: "3",
    title: "Spalić pierogi ćwicząc💪",
    column: ColumnType.TO_DO,
    color: "blue.300",
  },
  {
    id: "4",
    title: "Umyj się",
    column: ColumnType.IN_PROGRESS,
    color: "gray.400",
  },
];

function Column({ column }: { column: ColumnType }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const initialRef = React.useRef();

  const ColumnTasks = mockTasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ));

  const stackDirection = useBreakpointValue({
    base: "row",
    md: "column",
  }) as StackDirection;

  return (
    <Box>
      <Heading fontSize="md" mb={5} letterSpacing="wide">
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
        <SimpleBar style={{ maxHeight: 500 }}>
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
      <Modal
        // initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Title" /> {/* ref={initialRef} */}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Flex>
              <ButtonGroup size="sm" isAttached variant="outline">
                <Button colorScheme="blue" onClick={onClose}>
                  To do
                </Button>
                <Button colorScheme="yellow" onClick={onClose}>
                  For review
                </Button>
              </ButtonGroup>
              <Spacer />
              <ButtonGroup size="sm" isAttached variant="outline">
                <Button colorScheme="purple" onClick={onClose}>
                  In progress
                </Button>
                <Button colorScheme="green" onClick={onClose}>
                  Completed
                </Button>
              </ButtonGroup>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Column;
function toast(arg0: {
  title: string;
  description: string;
  status: string;
  duration: number;
  isClosable: boolean;
  position: string;
}) {
  throw new Error("Function not implemented.");
}
