import { Circle as ChakraCircle } from "@chakra-ui/react";

type ColorCircleProps = {
  color: string;
  selectedColor: string;
  onSelect: (color: string) => void;
};

const ColorCircle = ({ color, selectedColor, onSelect }: ColorCircleProps) => (
  <ChakraCircle
    size="50px"
    bg={`${color}.500`}
    mr={2}
    cursor="pointer"
    borderWidth={selectedColor === color ? "3px" : "0px"}
    borderColor="blue.100"
    _hover={{ scale: 1.1 }}
    transition="ease-in-out 0.05s"
    onClick={() => onSelect(color)}
  />
);

export default ColorCircle;
