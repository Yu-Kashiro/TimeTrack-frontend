import { Button } from "@chakra-ui/react/button";

type MainButtonProps = {
  size?: "xl" | "sm" | "md" | "lg" | "2xl" | "2xs" | "xs";
  colorPalette?: string;
  color?: string;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  mt?: string;
  mb?: string;
  disabled?: boolean;
  children: string;
};

export const MainButton = ({
  size = "xl",
  colorPalette,
  color,
  type = "submit",
  onClick,
  mt = "2",
  mb = "0",
  disabled = false,
  children,
}: MainButtonProps) => {
  return (
    <Button
      size={size}
      colorPalette={colorPalette}
      color={color}
      variant="subtle"
      type={type}
      onClick={onClick}
      mt={mt}
      mb={mb}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
