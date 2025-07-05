import { Button } from "@chakra-ui/react/button";

type MainButtonProps = {
  colorPalette?: string;
  color?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const MainButton = ({
  colorPalette,
  color,
  children,
  onClick,
  disabled = false,
}: MainButtonProps) => {
  return (
    <Button
      colorPalette={colorPalette}
      variant="subtle"
      size="xl"
      type="submit"
      mt={2}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
