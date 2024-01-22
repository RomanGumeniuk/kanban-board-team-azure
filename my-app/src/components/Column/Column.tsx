import { AddIcon } from "@chakra-ui/icons";
import mockData from "../../data/mockData.json";
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
  HStack,
  VStack, // import the HStack component
} from "@chakra-ui/react";
import { useState } from "react";
import { ColumnType } from "../../utils/enums";
import Task from "../Task/Task";
import { TaskModel } from "../../utils/models";
import React from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const ColumnColorScheme: Record<ColumnType, string> = {
  TO_DO: "gray",
  IN_PROGRESS: "yellow",
  FOR_REVIEW: "blue",
  COMPLETED: "green",
};

function Column({ column }: { column: ColumnType }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const initialRef = React.useRef<HTMLInputElement | null>(null);

  const stackDirection = useBreakpointValue({
    base: "row",
    md: "column",
  }) as StackDirection;

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
        <SimpleBar style={{ maxHeight: 600 }}>
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
      {/* ... existing code ... */}
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input placeholder="Title" ref={initialRef} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Description" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <VStack spacing={3}>
              {" "}
              {/* wrap the Buttons in a VStack */}
              <Button colorScheme="blue" onClick={onClose}>
                To do
              </Button>
              <Button colorScheme="yellow" onClick={onClose}>
                For review
              </Button>
              <Button colorScheme="purple" onClick={onClose}>
                In progress
              </Button>
              <Button colorScheme="green" onClick={onClose}>
                Completed
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Column;
