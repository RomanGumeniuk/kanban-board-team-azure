import { Circle as ChakraCircle, BoxProps } from "@chakra-ui/react";

type ColorCircleProps = BoxProps & {
  color: string;
  selectedColor: string;
  onColorSelect: (color: string) => void;
};

const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  selectedColor,
  onColorSelect,
  m = "10px", // default margin
  ...props
}) => (
  <ChakraCircle
    size="60px"
    bg={color}
    cursor="pointer"
    borderWidth={selectedColor === color ? "3px" : "0px"}
    borderColor="gray.600"
    _hover={{ boxShadow: "0 0 8px 2px rgba(0, 0, 0, 0.2)" }}
    transition="ease-in-out 0.05s"
    onClick={() => onColorSelect(color)}
    m={m}
    aria-label={`Select color ${color}`}
    {...props}
  />
);

export default ColorCircle;