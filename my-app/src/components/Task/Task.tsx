import { DeleteIcon, InfoIcon } from "@chakra-ui/icons";
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
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TaskModel } from "../../utils/models";
import EditTaskDrawer from "./EditTaskDrawer";
import { useRef, useState } from "react";
import { format } from "date-fns";
import kanbanService from "../../services/KanbanService";

type TaskProps = {
  index: number;
  task: TaskModel;
  fetchTasks: () => void;
};

function Task({ index, task, fetchTasks }: TaskProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const btnRef = useRef(null);

  const shouldShowDeleteIcon = useBreakpointValue({ base: true, md: false });

  const [isLoading, setIsLoading] = useState(false);

  //OnclickIkonka delete
  const handleDeleteConfirm = () => {
    setIsLoading(true); // Set isLoading to true when the delete operation starts
    kanbanService
      .deleteTask(task.id.toString())
      .then(({ status }) => {
        if (status === 200) {
          toast({
            title: "Task deleted.",
            description: "The task has been successfully deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          fetchTasks();
        } else {
          throw new Error("Failed to delete task");
        }
        onClose();
      })
      .catch((error: { message: any }) => {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: `There is not task with that id in Database`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    return format(date, "do MMMM yyyy, h:mm aaaa");
  }

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
          opacity: shouldShowDeleteIcon ? 1 : 1,
        }}
        onClick={onOpen}
      />
      <Tooltip
        label={
          <Box>
            <Text mb={2}>{`Created: ${formatDate(task.created_at)}`}</Text>
            <Text>{`Updated: ${formatDate(task.updated_at)}`}</Text>
          </Box>
        }
        placement="top"
        hasArrow
      >
        <IconButton
          position="absolute"
          top={0}
          left={0}
          zIndex={200}
          aria-label="info-task"
          size="xs"
          colorScheme="solid"
          color={"gray.700"}
          icon={<InfoIcon />}
          opacity={shouldShowDeleteIcon ? 1 : 0}
          _groupHover={{
            opacity: shouldShowDeleteIcon ? 1 : 1,
          }}
        />
      </Tooltip>
      <Box
        color={useColorModeValue("gray.800", "gray.50")}
        fontWeight="semibold"
        minH="70px"
        maxH="200px"
      >
        <Text fontSize="xs" opacity="0.6">
          #{task.id}
        </Text>
        {task.title}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Task {task.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this task?</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleDeleteConfirm}
              mr={3}
              isLoading={isLoading}
            >
              Confirm
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        size={"xs"}
        ref={btnRef}
        onClick={handleEditButtonClick}
        variant={"solid"}
      >
        Edit
      </Button>

      <EditTaskDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        task={task}
        fetchTasks={fetchTasks}
      />
    </Box>
  );
}

export default Task;
