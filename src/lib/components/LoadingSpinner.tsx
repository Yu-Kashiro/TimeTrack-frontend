import { Box } from "@chakra-ui/react/box";
import { Spinner } from "@chakra-ui/react/spinner";

export const LoadingSpinner = () => (
  <Box textAlign="center">
    <Spinner size="sm" />
  </Box>
);
