import {
  Circle as ChakraCircle,
  BoxProps,
  useBreakpointValue,
} from "@chakra-ui/react";

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
  const borderColor = isSelected ? "#37B5B6" : "transparent"; // More visible border color when selected

  // Adjust the size based on the current breakpoint
  const circleSize = useBreakpointValue({
    base: "40px",
    sm: "50px",
    md: "60px",
  });

  return (
    <ChakraCircle
      size={circleSize}
      bg={color}
      cursor="pointer"
      borderWidth="2.5px"
      borderColor={borderColor}
      _hover={{
        boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.3)",
        transform: "scale(1.1)",
      }}
      transition="ease-in-out 0.15s"
      onClick={() => onColorSelect(color)}
      m={m}
      aria-label={`Select color ${color}`}
      {...props}
    />
  );
};

export default ColorCircle;
