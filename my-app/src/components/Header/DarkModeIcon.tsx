import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";

function DarkModeIconButton({}: React.ComponentPropsWithoutRef<
  typeof IconButton
>) {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDark = colorMode === "dark";

  return (
    <IconButton
      bgColor={useColorModeValue("gray.300", "gray.700")}
      color={useColorModeValue("gray.900", "gray.300")}
      onClick={toggleColorMode}
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      aria-label={"dark-mode-toggle"}
    />
  );
}

export default DarkModeIconButton;
