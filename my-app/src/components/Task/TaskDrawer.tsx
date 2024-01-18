import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useToast, // import the useToast hook
} from "@chakra-ui/react";

import { TaskModel } from "../../utils/models";

type TaskDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  task: TaskModel;
};

function TaskDrawer({ isOpen, onClose, task }: TaskDrawerProps) {
  const toast = useToast(); // call the useToast hook

  const handleSaveConfirm = () => {
    // handleDeleteButtonClick(task.id);
    toast({
      title: "Task has been edited sucessfully!",
      description: `You edited task ${task.title}!`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Task</DrawerHeader>

        <DrawerBody>
          <Input
            placeholder="Task title"
            defaultValue={task.title}
            size={"lg"}
            variant={"filled"}
          />
          {/* Add more inputs as needed */}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSaveConfirm}>
            {" "}
            {/* add the onClick handler */}
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default TaskDrawer;
