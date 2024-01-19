import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "#f8f5f2",
      },
    }),
  },
});

export default theme;
