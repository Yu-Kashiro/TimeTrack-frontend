import { HStack } from "@chakra-ui/react/stack";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import railsLogo from "../assets/rails.svg";
import { ColorModeButton } from "./ui/color-mode";
import { Box } from "@chakra-ui/react/box";

export const Footer = () => {
  return (
    <>
      <Box mt={120}>
        <ColorModeButton />
      </Box>
      <HStack justify="center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://rubyonrails.org" target="_blank">
          <img src={railsLogo} className="logo rails" alt="Rails logo" />
        </a>
      </HStack>
    </>
  );
};
