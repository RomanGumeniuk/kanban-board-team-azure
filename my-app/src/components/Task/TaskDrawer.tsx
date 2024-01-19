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
  Textarea,
  useToast,
  Heading,
  VStack,
  Box, // import the Box component
} from "@chakra-ui/react";

import { TaskModel } from "../../utils/models";

type TaskDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  task: TaskModel;
};

function TaskDrawer({ isOpen, onClose, task }: TaskDrawerProps) {
  const toast = useToast();

  const handleSaveConfirm = () => {
    toast({
      title: "Task has been edited sucessfully!",
      description: `You edited task number: ${task.id}!`,
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
        <DrawerHeader>Edit Task number: {task.id}</DrawerHeader>

        <DrawerBody>
          <Box display="flex" flexDirection="column" alignItems="center">
            <VStack align="stretch" spacing={5} w="100%" maxW="85%">
              <Heading size="md">Title</Heading>
              <Input
                placeholder="Task title"
                defaultValue={task.title}
                size={"lg"}
                variant={"filled"}
              />

              <Heading size="md">Description</Heading>
              <Textarea
                placeholder="Task description"
                defaultValue={task.description}
                size={"lg"}
                variant={"filled"}
                minHeight="150px"
                maxHeight={"600px"}
              />
            </VStack>
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSaveConfirm}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default TaskDrawer;
