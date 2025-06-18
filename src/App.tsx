import "./App.css";
import { Box } from "@chakra-ui/react";
import { Footer } from "./components/Footer.js";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <>
      <Outlet />
      <Box>
        <Footer />
      </Box>
    </>
  );
};
