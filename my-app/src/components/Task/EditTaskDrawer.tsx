import { useState, useCallback, ChangeEvent } from "react";
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
import ColorCircle from "./ColorCircle";
import kanbanService from "../../services/KanbanService";

const EditableControls = () => {
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
    <IconButton
      aria-label="edit"
      size="sm"
      icon={<EditIcon />}
      {...getEditButtonProps()}
    />
  );
};

type TaskDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  task: TaskModel;
  fetchTasks: () => void;
};

function EditTaskDrawer({
  isOpen,
  onClose,
  task,
  fetchTasks,
}: TaskDrawerProps) {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(
    task.color || "gray"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [column, setColumn] = useState(task.column.toString());

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const handleColorSelect = useCallback((color: string) => {
    console.log("Selected color:", color); // Debugging line
    setSelectedColor(color);
  }, []);

  const handleSaveConfirm = async () => {
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
    setIsLoading(true);
    const updatedTask = {
      ...task,
      title,
      description,
      color: selectedColor,
      column: parseInt(column),
    };

    try {
      const response = await kanbanService.updateTask(
        task.id.toString(),
        updatedTask
      );
      if (response.status === 200) {
        toast({
          title: "Task has been edited successfully!",
          description: `You edited task number: ${task.id}!`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        fetchTasks();
        onClose();
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast({
          title: "Error updating task",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = ["#99BC85", "#FF8080", "#F6FDC3", "#CDFAD5", "#E5E1DA"]; //kolory do wyboru

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Edit Task: {task.title} <br /> Id: {task.id}
        </DrawerHeader>
        <DrawerBody>
          <Flex direction="column" align="center" justify="center">
            <VStack spacing={5} align="stretch" w="100%" maxW="85%">
              <EditableField label="Title" value={title} onChange={setTitle} />
              <EditableColorSelection
                label="Color"
                selectedColor={selectedColor}
                onSelect={handleColorSelect}
                colors={COLORS}
              />
              <EditableField
                label="Description"
                value={description}
                onChange={setDescription}
                isTextarea
              />
              <FileUpload
                label="Image"
                selectedFile={selectedFile}
                onChange={handleFileChange}
              />
              <TaskColumnSelection value={column} onChange={setColumn} />
            </VStack>
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            onClick={handleSaveConfirm}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

type EditableFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isTextarea?: boolean;
};

function EditableField({
  label,
  value,
  onChange,
  isTextarea = false,
}: EditableFieldProps) {
  return (
    <Box>
      <Heading size="md">{label}</Heading>
      <Editable
        defaultValue={value}
        isPreviewFocusable={false}
        submitOnBlur={false}
        onChange={onChange}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <EditablePreview />
          <EditableControls />
        </Flex>
        {isTextarea ? (
          <EditableTextarea minHeight="150px" maxHeight="600px" autoFocus />
        ) : (
          <EditableInput autoFocus />
        )}
      </Editable>
    </Box>
  );
}

type EditableColorSelectionProps = {
  label: string;
  selectedColor: string;
  onSelect: (color: string) => void;
  colors: string[];
};

function EditableColorSelection({
  label,
  selectedColor,
  onSelect,
  colors,
}: EditableColorSelectionProps) {
  return (
    <Box>
      <Heading size="md">{label}</Heading>
      <Flex>
        {colors.map((color) => (
          <ColorCircle
            key={color}
            m={10}
            color={color}
            selectedColor={selectedColor}
            onColorSelect={onSelect}
          />
        ))}
      </Flex>
    </Box>
  );
}

type FileUploadProps = {
  label: string;
  selectedFile: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function FileUpload({ label, selectedFile, onChange }: FileUploadProps) {
  return (
    <Box>
      <Heading size="md">{label}</Heading>
      <Input
        type="file"
        accept="image/*"
        id="file-upload"
        style={{ display: "none" }}
        onChange={onChange}
      />
      <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        <Button as="span">Upload Image</Button>
      </label>
      {selectedFile && <Text mt={2}>Selected file: {selectedFile}</Text>}
    </Box>
  );
}

type TaskColumnSelectionProps = {
  value: string;
  onChange: (value: string) => void;
};

function TaskColumnSelection({ value, onChange }: TaskColumnSelectionProps) {
  return (
    <RadioGroup onChange={onChange} value={value}>
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
  );
}

export default EditTaskDrawer;
