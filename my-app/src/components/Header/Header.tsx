import { Heading } from "@chakra-ui/react";
import DarkModeIconButton from "./DarkModeIcon";

const Header: React.FC = () => {
  return (
    <Heading
      fontSize={{ base: "4xl", sm: "5xl", md: "8xl" }}
      fontWeight="bold"
      textAlign="center"
      bgGradient="linear(to-b, #0D2137,  #00FF7F)"
      bgClip="text"
      mt={2}
    >
      KRAP Kanban Board
      <DarkModeIconButton pos="absolute" top={0} right={2} m="1rem" />
    </Heading>
  );
};

export default Header;
