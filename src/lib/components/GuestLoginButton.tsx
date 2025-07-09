import { guestSignIn } from "@/lib/api/auth";
import { Button } from "@chakra-ui/react/button";
import { useNavigate } from "react-router-dom";

export const GuestLoginButton = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    console.log("ゲストログインの実行");
    try {
      await guestSignIn();
      navigate("/work_times");
    } catch (e) {
      console.error("ゲストログインエラー:", e);
    }
  };

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
