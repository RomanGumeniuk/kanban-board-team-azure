import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useToast,
  Heading,
  VStack,
  Box,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  IconButton,
  ButtonGroup,
  useEditableControls,
  DrawerCloseButton,
  Text,
  Input,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { TaskModel } from "../../utils/models";
import { useState } from "react";
import ColorCircle from "./ColorCircle";
import React from "react";
import kanbanService from "../../services/KanbanService";

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
    setColor(color);
  };
  const handleSaveConfirm = async () => {
    const taskData = {
      title,
      description,
      color,
      column,
    };

    try {
      await kanbanService.updateTask(task.id.toString(), taskData);
      toast({
        title: "Task has been edited successfully!",
        description: `You edited task number: ${task.id}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.error("Failed to update task", error);
      toast({
        title: "Failed to update task",
        description: `You didnt update ${task.id}!`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    onClose();
  };
  const [value, setValue] = React.useState("1");
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [color, setColor] = useState(selectedColor);
  const [column, setColumn] = useState(value);
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="submit"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="cancel"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="Edit"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleSaveConfirm();
    }
  };
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Edit Task: {task.title} <br></br>
          Id: {task.id}
        </DrawerHeader>
        <DrawerBody>
          <form onKeyDown={handleKeyDown}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <VStack align="stretch" spacing={5} w="100%" maxW="85%">
                <Heading size="md">Title</Heading>
                <Editable
                  defaultValue={task.title}
                  isPreviewFocusable={false}
                  submitOnBlur={false}
                  onChange={(newTitle) => setTitle(newTitle)}
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <EditablePreview />
                    <EditableControls />
                  </Flex>
                  <EditableInput autoFocus />
                </Editable>
                <Heading size="md">Color</Heading>
                <Flex>
                  <Box width="25%" p={2}>
                    <ColorCircle
                      color="green"
                      selectedColor={selectedColor}
                      onSelect={handleColorSelect}
                    />
                  </Box>
                  <Box width="25%" p={2}>
                    <ColorCircle
                      color="blue"
                      selectedColor={selectedColor}
                      onSelect={handleColorSelect}
                    />
                  </Box>
                  <Box width="25%" p={2}>
                    <ColorCircle
                      color="red"
                      selectedColor={selectedColor}
                      onSelect={handleColorSelect}
                    />
                  </Box>
                  <Box width="25%" p={2}>
                    <ColorCircle
                      color="gray"
                      selectedColor={selectedColor}
                      onSelect={handleColorSelect}
                    />
                  </Box>
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
                <Editable
                  defaultValue={task.description}
                  textAlign="start"
                  isPreviewFocusable={false}
                  submitOnBlur={false}
                  onChange={(description) => setDescription(description)}
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <EditablePreview />
                    <EditableControls />
                  </Flex>
                  <EditableTextarea
                    minHeight="150px"
                    maxHeight="600px"
                    autoFocus
                  />
                </Editable>
              </VStack>
            </Box>
          </form>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSaveConfirm}>
            Save
          </Button>
          <VStack alignItems="center">
            <RadioGroup
              onChange={(value) => {
                setValue(value);
                setColumn(value);
              }}
              value={value}
            >
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
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
export default TaskDrawer;
