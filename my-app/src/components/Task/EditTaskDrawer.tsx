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
} from "@chakra-ui/react";
import { BlobServiceClient } from '@azure/storage-blob';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(task.imageUrl ? task.imageUrl : null);
  const [taskFiles, setTaskFiles] = useState<string[]>([]);

  const account = import.meta.env.VITE_STORAGE_ACCOUNT;
  const sasToken = import.meta.env.VITE_STORAGE_SAS;
  const containerName = import.meta.env.VITE_STORAGE_CONTAINER;
  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  
  // When the task prop updates, reset the local state
  useEffect(() => {
    setSelectedColor(task.color || "#99BC85");
    setTitle(task.title);
    setDescription(task.description);
    setColumn(task.column.toString());
    setImageUrl(task.imageUrl ? task.imageUrl : null);
  }, [task]);

  // Fetch the list of blobs (files) for the task when the drawer opens
  useEffect(() => {
    const fetchTaskFiles = async () => {
      let blobs = [];
      for await (const blob of containerClient.listBlobsFlat()) {
        if (blob.name.startsWith(task.id.toString())) {
          blobs.push(blob.name);
        }
      }
      setTaskFiles(blobs);
    };

    if (isOpen) {
      fetchTaskFiles();
    }
  }, [isOpen, task.id, containerClient]);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      try {
        const blobName = `${task.id}-${new Date().getTime()}-${file.name}`;
        const blobClient = containerClient.getBlockBlobClient(blobName);
        await blobClient.uploadData(file, { blobHTTPHeaders: { blobContentType: file.type } });
        const url = `https://${account}.blob.core.windows.net/${containerName}/${blobName}`;
        setImageUrl(url);
        
        // Update the task with the new image URL
        const updatedTask = {
          ...task,
          imageUrl: url,
        };
        await kanbanService.updateTask(task.id.toString(), updatedTask);

        toast({
          title: "Image has been uploaded successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } catch (error: any) {
        console.error(error);
        toast({
          title: "Failed to upload image.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const handleSaveConfirm = async () => {
    // Prevent saving if color is not selected
    if (!selectedColor || selectedColor === "gray") { toast({ title: "Color Selection", description: "Please select a color before updating the task.", status: "warning", duration :5000, isClosable: true, position: "bottom", }); return; }
    setIsLoading(true);
    const updatedTask = {
      ...task,
      title,
      description,
      color: selectedColor,
      column: parseInt(column),
      imageUrl,
    };
    
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

  const handleFileDelete = async (fileName: string) => {
    try {
      const blobClient = containerClient.getBlockBlobClient(fileName);
      await blobClient.delete();

      // Remove the file from the taskFiles state
      setTaskFiles(prevState => prevState.filter(file => file !== fileName));

      toast({
        title: "File deleted.",
        description: "The file has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Failed to delete file.",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };


  const drawerSize = useBreakpointValue({ base: "full", md: "xl" });
  // const saveButtonSize = useBreakpointValue({base: })

  const handleFileDownload = async (fileName: string) => {
    try {
      const blobClient = containerClient.getBlockBlobClient(fileName);
      const downloadLink = document.createElement('a');
      downloadLink.href = await blobClient.url;
      downloadLink.download = fileName.split('-').slice(2).join('-'); // This line is updated to remove the task id and timestamp from the file name
      downloadLink.style.display = 'none'; // This line is added to prevent the link from being visible
      document.body.appendChild(downloadLink); // This line is added to append the link to the body
      downloadLink.click(); // This line triggers the download
      document.body.removeChild(downloadLink); // This line removes the link from the body after triggering the download
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to download file.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const COLORS = ["#99BC85", "#FF8080", "#F6FDC3", "#CDFAD5", "#E5E1DA"]; // Available colors
  
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Task: {task.title}<br />ID: {task.id}</DrawerHeader>
        <DrawerBody>
          <Flex direction="column" align="center" justify="center">
            <VStack spacing={5} align="stretch" w="100%" maxW="85%">
              <EditableField label="Title" value={title} onChange={setTitle} />
              <EditableColorSelection label="Color" selectedColor={selectedColor} onSelect={handleColorSelect} colors={COLORS} />
              <EditableField label="Description" value={description} onChange={setDescription} isTextarea />
              <FileUpload label="Image" selectedFile={selectedFile} onChange={handleFileChange} />
              <TaskColumnSelection value={column} onChange={setColumn} />
              <Box>

                <Heading size="md">Title</Heading>
                <Input
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  variant={"filled"}
                />
              </Box>
              <EditableColorSelection
                label="Color"
                selectedColor={selectedColor}
                onSelect={handleColorSelect}
                colors={COLORS}
              />
              <Box>
                <Heading size="md">Description</Heading>
                <Textarea
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                  minHeight="150px"
                  maxHeight="600px"
                  variant={"filled"}
                />

                <Heading size="md">Files</Heading>
                {taskFiles.map((file, index) => (
                  <Flex key={index} alignItems="center">
                    <Text flex="1">{file}</Text>
                    <ButtonGroup>
                      <Button onClick={() => handleFileDelete(file)}>Delete</Button>
                      <Button onClick={() => handleFileDownload(file)}>Download</Button>
                    </ButtonGroup>
                  </Flex>
                ))}

              </Box>
            </VStack>
          </Flex>
        </DrawerBody>
        <DrawerFooter>

          <Button variant="outline" mr={5} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            onClick={handleSaveConfirm}
            w={"25%"}
            mr={40}
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

function EditableField({ label, value, onChange, isTextarea = false }: EditableFieldProps) {
  return (
    <Box>
      <Heading size="md">{label}</Heading>
      <Editable defaultValue={value} isPreviewFocusable={false} submitOnBlur={false} onChange={onChange}>
        <Flex justifyContent="space-between" alignItems="center">
          <EditablePreview />
          <EditableControls />
        </Flex>
        {isTextarea ? (<EditableTextarea minHeight="150px" maxHeight="600px" autoFocus />) : (<EditableInput autoFocus />)}
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

function EditableColorSelection({ label, selectedColor, onSelect, colors }: EditableColorSelectionProps) {
  return (
    <Box>
      <Heading size="md">{label}</Heading>
      <Flex>
        {colors.map((color) => (<ColorCircle key={color} m={10} color={color} selectedColor={selectedColor} onColorSelect={onSelect} />))}
      </Flex>
    </Box>
  );
}

type FileUploadProps = {
  label: string;
  selectedFile: File | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function FileUpload({ label, selectedFile, onChange }: FileUploadProps) {
  return (
    <Box>
      <Heading size="md">{label}</Heading>
      <Input type="file" accept="*/*" id="file-upload" style={{ display: "none" }} onChange={onChange} />
      <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        <Button as="span">Upload File</Button>
      </label>
      {selectedFile && <Text mt={2}>Selected file: {selectedFile.name}</Text>}
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
        <Radio value="1" colorScheme="gray">To do</Radio>
        <Radio value="2" colorScheme="yellow">In progress</Radio>
        <Radio value="3" colorScheme="blue">For review</Radio>
        <Radio value="4" colorScheme="green">Completed</Radio>
      </Stack>
    </RadioGroup>
  );
}

export default EditTaskDrawer;