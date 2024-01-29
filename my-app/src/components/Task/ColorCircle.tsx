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
  m = "10",
  ...props
}) => {
  const isSelected = selectedColor === color;
  const borderColor = isSelected ? "blue.500" : "transparent"; // More visible border color when selected

  return (
    <ChakraCircle
      size="60px"
      bg={color}
      cursor="pointer"
      borderWidth="3px" // Consistent border width
      borderColor={borderColor}
      _hover={{
        boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.3)",
        transform: "scale(1.1)",
      }} // Adjust hover effect
      transition="ease-in-out 0.15s" // Smoother transition
      onClick={() => onColorSelect(color)}
      m={m}
      aria-label={`Select color ${color}`}
      {...props}
    />
  );
};

export default ColorCircle;
