import {
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import DarkModeIconButton from "./DarkModeIcon";

const Header: React.FC = () => {
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
      {/* <Heading
        fontSize={{ base: "4xl", sm: "5xl", md: "4xl" }}
        textAlign="left"
        bgGradient="linear(to-b, #0D2137,  #00FF7F)"
        bgClip="text"
      >
        KRAP Kanban Board
      </Heading> */}
      <DarkModeIconButton />
      <Avatar size="md" name="Oman pendal" src="path_to_user_image" />
    </Box>
  );
};

export default Header;
