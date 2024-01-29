import { useState, useCallback, useEffect, ChangeEvent } from "react";
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
  useBreakpointValue,
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
      aria-label="editButton"
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

const EditTaskDrawer: React.FC<TaskDrawerProps> = ({
  isOpen,
  onClose,
  task,
  fetchTasks,
}) => {
  const toast = useToast();
  const [selectedColor, setSelectedColor] = useState<string>("#99BC85");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [column, setColumn] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // When the task prop updates, reset the local state
  useEffect(() => {
    setSelectedColor(task.color || "#99BC85");
    setTitle(task.title);
    setDescription(task.description);
    setColumn(task.column.toString());
  }, [task]);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const handleSaveConfirm = async () => {
    // Prevent saving if color is not selected
    if (!selectedColor || selectedColor === "gray") {
      toast({
        title: "Color Selection",
        description: "Please select a color before updating the task.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setIsLoading(true);
    const updatedTask = {
      ...task,
      title,
      description,
      color: encodeURIComponent(selectedColor),
      column: parseInt(column),
    };

    console.log(updatedTask); // Add this line
    try {
      const response = await kanbanService.updateTask(
        task.id.toString(),
        updatedTask
      );
      if (response.status === 200) {
        toast({
          title: "Task Updated Successfully",
          description: `Task number ${task.id} has been updated.`,
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
      toast({
        title: "Error Updating Task",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = ["#99BC85", "#FF8080", "#F6FDC3", "#CDFAD5", "#E5E1DA"]; // Available colors

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const drawerSize = useBreakpointValue({ base: "full", md: "xl" });

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={drawerSize}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Edit Task: {task.title} <br /> ID: {task.id}
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
};

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
  const textareaSize = useBreakpointValue({ base: "100px", md: "150px" });

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
          <EditableTextarea
            minHeight={textareaSize}
            maxHeight="600px"
            autoFocus
          />
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
  const inputDisplay = useBreakpointValue({ base: "block", md: "none" });

  return (
    <Box>
      <Heading size="md">{label}</Heading>
      <Input
        type="file"
        accept="image/*"
        id="file-upload"
        style={{ display: inputDisplay }}
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
