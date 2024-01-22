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
  Button,
  useBreakpointValue,
  StackDirection,
  VStack,
  Radio,
  RadioGroup,
  useToast,
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
  const toast = useToast();
  const [value, setValue] = React.useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const initialRef = React.useRef<HTMLInputElement | null>(null);

  const stackDirection = useBreakpointValue({
    base: "row",
    md: "column",
  }) as StackDirection;

  const handleAddTaskConfirm = () => {
    toast({
      title: "Task Added.",
      description: "The task has been successfully created.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    onClose();
  };

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

          <VStack alignItems="center">
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row">
                <Radio value="1" colorScheme="gray">
                  To do
                </Radio>
                <Radio value="2" colorScheme="yellow">
                  In progress
                </Radio>
                <Radio value="3" colorScheme="blue">
                  For review
                </Radio>
                <Radio value="4" colorScheme="green">
                  Completed
                </Radio>
              </Stack>
            </RadioGroup>
          </VStack>

          <Button
            w={"60%"}
            mt={4}
            alignSelf={"center"}
            colorScheme="blue"
            onClick={handleAddTaskConfirm}
            variant={"solid"}
            mb={0.5}
          >
            Save
          </Button>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Column;
