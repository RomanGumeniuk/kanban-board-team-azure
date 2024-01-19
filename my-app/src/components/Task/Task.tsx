import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TaskModel } from "../../utils/models";
import TaskDrawer from "./TaskDrawer";
import { useRef, useState } from "react";

type TaskProps = {
  index: number;
  task: TaskModel;
};

function Task({ index, task }: TaskProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const btnRef = useRef(null);

  const shouldShowDeleteIcon = useBreakpointValue({ base: true, md: false });

  const handleDeleteConfirm = () => {
    // handleDeleteButtonClick(task.id);
    toast({
      title: "Task deleted.",
      description: "The task has been successfully deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    onClose();
  };

  const handleEditButtonClick = () => {
    setIsDrawerOpen(true);
  };

  return (
    <Box
      as="div"
      role="group"
      position="relative"
      rounded="lg"
      w={200}
      pl={8}
      pr={8}
      pt={3}
      pb={5}
      boxShadow="xl"
      cursor="pointer"
      bgColor={task.color}
      aria-label={`Task ${index + 1}`}
    >
      <IconButton
        position="absolute"
        top={0}
        right={0}
        zIndex={200}
        aria-label="delete-task"
        size="md"
        colorScheme="solid"
        color={"gray.700"}
        icon={<DeleteIcon />}
        opacity={shouldShowDeleteIcon ? 1 : 0}
        _groupHover={{
          opacity: shouldShowDeleteIcon ? 1 : undefined,
        }}
        onClick={onOpen}
      />
      <Text
        color={useColorModeValue("gray.800", "gray.50")}
        fontWeight="semibold"
        minH="70px"
        maxH="200px"
      >
        {task.title}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this task?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleDeleteConfirm} mr={3}>
              Confirm
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button size={"xs"} ref={btnRef} onClick={handleEditButtonClick}>
        Edit Task
      </Button>

      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        task={task}
      />
    </Box>
  );
}

export default Task;
