import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Spinner } from "@chakra-ui/react/spinner";
import { useGuestLogin } from "@/lib/hooks/useGuestLogin";

export const GuestLoginButton = () => {
  const { isLoading, handleGuestLogin } = useGuestLogin();

  if (isLoading) {
    return (
      <Box textAlign="center">
        <Spinner size="sm" />
      </Box>
    );
  }

  return (
    <Button
      variant="subtle"
      size="xl"
      type="button"
      mt="2"
      onClick={handleGuestLogin}
    >
      ゲストログイン
    </Button>
  );
};
