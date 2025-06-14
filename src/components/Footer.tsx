import { Box } from "@chakra-ui/react/box";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <Box mt={50}>
        <Link to="/work_times/detail">detail</Link>
      </Box>
      <Box>
        <Link to="/work_times/index">index</Link>
      </Box>
      <Box>
        <Link to="/work_times/registration">registration</Link>
      </Box>
    </>
  );
};
