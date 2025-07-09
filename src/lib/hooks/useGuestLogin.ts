import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { guestSignIn } from "@/lib/api/auth";

export const useGuestLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    setIsLoading(true);
    try {
      await guestSignIn();
      navigate("/work_times");
    } catch (e) {
      setIsLoading(false);
      console.error("ゲストログインエラー:", e);
    }
  };

  return {
    isLoading,
    handleGuestLogin,
  };
};
