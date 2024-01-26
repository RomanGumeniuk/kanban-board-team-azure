import { useState } from "react";
import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ColorCircle from "../Task/ColorCircle";
import kanbanService from "../../services/KanbanService";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
};

const AddTaskModal = ({ isOpen, onClose, onTaskAdded }: AddTaskModalProps) => {
  const toast = useToast();
  const [value, setValue] = React.useState("1");
  const initialRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("gray");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleAddTaskConfirm = async () => {
    setIsLoading(true);
    const trimmedTitle = title.trim();
    const finalTitle = trimmedTitle === "" ? `New Task ` : trimmedTitle;
    const taskData = {
      title: finalTitle,
      description,
      color: selectedColor,
      column: Number(value),
    };

    try {
      await kanbanService.createTask(taskData);
      toast({
        title: "Task Added.",
        description: "The task has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setTitle("");
      setDescription("");
      setSelectedColor("gray");
      setValue("1");
      onTaskAdded();
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "There was an error creating the task.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleAddTaskConfirm();
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <form onKeyDown={handleKeyDown}>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                ref={initialRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                h={90}
                maxH={100}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Color</FormLabel>
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
          <Flex justifyContent="center">
            <Button
              w={"40%"}
              mt={4}
              colorScheme="blue"
              onClick={handleAddTaskConfirm}
              variant={"solid"}
              mb={0.5}
              isLoading={isLoading}
            >
              Save
            </Button>
          </Flex>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
