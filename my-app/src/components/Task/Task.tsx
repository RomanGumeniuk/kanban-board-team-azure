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
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TaskModel } from "../../utils/models";

type TaskProps = {
  index: number;
  task: TaskModel;
};

function Task({ index, task }: TaskProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
        onClick={onOpen}
      />
      <Textarea
        color={useColorModeValue("gray.700", "gray.800")}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        value={task.title}
      />
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
    </Box>
  );
}

export default Task;
