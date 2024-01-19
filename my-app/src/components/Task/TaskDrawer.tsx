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
  Text,
  useToast,
  Heading,
  VStack,
  Box,
  Flex,
} from "@chakra-ui/react";

import { TaskModel } from "../../utils/models";
import { useState } from "react";
import ColorCircle from "./Circle";

type TaskDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  task: TaskModel;
};

function TaskDrawer({ isOpen, onClose, task }: TaskDrawerProps) {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("gray");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

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

              <Heading size="md">Color</Heading>
              <Flex>
                <ColorCircle
                  color="green"
                  selectedColor={selectedColor}
                  onSelect={handleColorSelect}
                />
                <ColorCircle
                  color="blue"
                  selectedColor={selectedColor}
                  onSelect={handleColorSelect}
                />
                <ColorCircle
                  color="red"
                  selectedColor={selectedColor}
                  onSelect={handleColorSelect}
                />
                <ColorCircle
                  color="gray"
                  selectedColor={selectedColor}
                  onSelect={handleColorSelect}
                />
              </Flex>

              <Heading size="md">Image</Heading>
              <Box>
                <Input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                  <Button as="span">Upload Image</Button>
                </label>
                {selectedFile && (
                  <Text mt={2}>Selected file: {selectedFile}</Text>
                )}
              </Box>

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
