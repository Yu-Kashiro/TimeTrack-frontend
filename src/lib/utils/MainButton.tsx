import { Button } from "@chakra-ui/react/button";
import type { ReactNode } from "react";

type MainButtonProps = {
  colorPalette: string;
  color: string;
  onClick: () => void;
  children: ReactNode
}

export const MainButton = ({colorPalette, color, onClick,  children }: MainButtonProps) => {
  return (
    <Button
      colorPalette={colorPalette}
      variant="subtle"
      size="xl"
      type="submit"
      mt={5}
      color={color}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
