import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import DarkModeIconButton from "./DarkModeIcon";
import { useState } from "react";
import KanbanService from "../../services/KanbanService";

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const isLoggedIn = await KanbanService.LoginToSite(username, password);

      if (isLoggedIn) {
        setIsLoggedIn(true);
        onClose();
        toast({
          title: "Logged in.",
          description: "You have successfully logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login failed.",
          description: "Please check your username and password and try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={4}
    >
      <Menu>
        <MenuButton
          aria-label="menu-button"
          as={IconButton}
          icon={<HamburgerIcon />}
        />
        <MenuList>
          <MenuItem aria-label="change-theme-menu-item">Change Theme</MenuItem>
          <MenuItem aria-label="options-menu-item">Options</MenuItem>
          <MenuItem aria-label="more-info-menu-item">More Info</MenuItem>
        </MenuList>
      </Menu>
      <DarkModeIconButton />
      <Avatar size="md" name="Oman pendal" src="path_to_user_image" />
      {!isLoggedIn && (
        <Modal
          size={"full"}
          isOpen={!isLoggedIn}
          onClose={onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign In</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input type="text" onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl mt={4} id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleLogin}>
                Log In
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Header;