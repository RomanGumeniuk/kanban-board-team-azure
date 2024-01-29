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
import { ColumnType } from "../../utils/enums";
import mapColumnTypeToRadioButtonValue from "../../utils/enums";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
  column: ColumnType;
};

const AddTaskModal = ({
  isOpen,
  onClose,
  onTaskAdded,
  column,
}: AddTaskModalProps) => {
  const toast = useToast();
  const initialRef = React.useRef<HTMLInputElement | null>(null);

  const [selectedColor, setSelectedColor] = useState<string>("#99BC85");

  const [title, setTitle] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [value, setValue] = React.useState(
    mapColumnTypeToRadioButtonValue(column)
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const COLORS = ["#99BC85", "#FF8080", "#F6FDC3", "#CDFAD5", "#E5E1DA"];

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
      setSelectedColor("#99BC85");
      setValue(mapColumnTypeToRadioButtonValue(column));
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
  if (!selectedColor || selectedColor === "gray") {
    // przykładowy warunek sprawdzający, czy kolor został wybrany
    toast({
      title: "Wybór koloru",
      description: "Proszę wybrać kolor przed dodaniem zadania.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return; // Przerwanie funkcji, jeśli kolor nie został wybrany
  }

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
                maxLength={110}
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
              <Flex mr={10}>
                {COLORS.map((color) => (
                  <Box key={color} width="20%">
                    <ColorCircle
                      color={color}
                      selectedColor={selectedColor}
                      onColorSelect={handleColorSelect}
                    />
                  </Box>
                ))}
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
