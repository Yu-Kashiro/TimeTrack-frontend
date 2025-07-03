import { Box } from "@chakra-ui/react/box";

type errorMessageProps = {
  errorMessage: string;
}

export const ErrorMessage = ({ errorMessage }: errorMessageProps) => {
  if (!errorMessage) return null;

  return (
    <Box color="red" mt={2}  textAlign="center">
      {errorMessage}
    </Box>
  );
};
