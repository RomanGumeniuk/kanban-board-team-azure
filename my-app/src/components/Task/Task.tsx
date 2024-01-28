import { useState } from "react";
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
import { DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import { TaskModel } from "../../utils/models";
import EditTaskDrawer from "./EditTaskDrawer";
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
  const shouldShowDeleteIcon = useBreakpointValue({ base: true, md: false });

  const handleDeleteConfirm = async () => {
    try {
      const response = await kanbanService.deleteTask(task.id.toString());
      if (response.status === 200) {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the task.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    onClose();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const differenceInDays = Math.round(
      (now.getTime() - date.getTime()) / oneDay
    );
    const isToday = date.toDateString() === now.toDateString();

    // Resetting 'now' to today's date as it was changed above
    now.setDate(new Date().getDate());

    const isYesterday =
      new Date(now.setDate(now.getDate() - 1)).toDateString() ===
      date.toDateString();
    const isSameYear = date.getFullYear() === now.getFullYear();

    let formatString = "";

    if (isToday) {
      formatString = `'Today', HH:mm`;
    } else if (isYesterday) {
      formatString = `'Yesterday', HH:mm`;
    } else if (differenceInDays <= 7) {
      // Within the last week: Show day of the week and time
      formatString = "EEEE, HH:mm";
    } else if (isSameYear) {
      // More than a week ago, but within the same year: Show day, month and time
      formatString = "do MMMM, HH:mm";
    } else {
      // Different year: Show day, month and year
      formatString = "do MMMM yyyy, HH:mm";
    }

    return format(date, formatString);
  };

  const handleTaskClick = () => setIsDrawerOpen(true);

  const handleIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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
      onClick={handleTaskClick}
    >
      <IconButton
        position="absolute"
        top={0}
        right={0}
        zIndex={200}
        aria-label="Delete task"
        size="sm"
        bg={"transparent"}
        icon={<DeleteIcon />}
        opacity={shouldShowDeleteIcon ? 1 : 0}
        _groupHover={{ opacity: 0.8 }}
        transition="all 0.35s ease-in-out"
        _hover={{
          bg: "transparent",
          transform: "scale(1.05)",
          boxShadow: "0 0 5px 10  px rgba(0, 0, 0, 0.8)",
        }}
        color={useColorModeValue("gray.900", "gray.900")}
        onClick={(e) => {
          handleIconClick(e);
          onOpen();
        }}
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
          aria-label="Task info"
          size="xs"
          icon={<InfoIcon />}
          opacity={shouldShowDeleteIcon ? 1 : 0}
          _groupHover={{ opacity: 0.8 }}
          onClick={handleIconClick}
          bg="transparent"
          transition="all 0.35s ease-in-out"
          _hover={{
            bg: "transparent",
            transform: "scale(1.1)",
            boxShadow: "0 0 5px 10  px rgba(0, 0, 0, 0.8)",
          }}
          color={useColorModeValue("gray.900", "gray.900")}
        />
      </Tooltip>
      <Box
        color={useColorModeValue("gray.900", "gray.900")}
        fontWeight="semibold"
        minH="70px"
        maxH="200px"
      >
        <Text fontSize="xs" opacity="0.55">
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
              isLoading={false}
            >
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
