import { Button } from "@chakra-ui/react/button";
import type { ReactNode } from "react";

type MainButtonProps = {
  colorPalette: string;
  color: string;
  children: ReactNode
}

export const MainButton = ({colorPalette, color, children }: MainButtonProps) => {
  return (
    <Button
      colorPalette={colorPalette}
      variant="subtle"
      type="submit"
      mt={5}
      color={color}
    >
      {children}
    </Button>
  );
};
