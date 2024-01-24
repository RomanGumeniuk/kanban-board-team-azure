import {
  Box,
  Heading,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={4}
    >
      <Heading
        fontSize={{ base: "4xl", sm: "5xl", md: "4xl" }}
        textAlign="left"
        bgGradient="linear(to-b, #0D2137,  #00FF7F)"
        bgClip="text"
      >
        KRAP Kanban Board
      </Heading>

      <Menu>
        <MenuButton as={IconButton} icon={<HamburgerIcon />} />
        <MenuList>
          <MenuItem>Change Theme</MenuItem>
          <MenuItem>Options</MenuItem>
          <MenuItem>More Info</MenuItem>
        </MenuList>
      </Menu>

      <Avatar size="md" name="User Name" src="path_to_user_image" />
    </Box>
  );
};

export default Header;
