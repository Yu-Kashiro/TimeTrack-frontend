import { useState } from "react";
import { signOut } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      navigate("/signin");
    } catch (e) {
      setIsLoading(false);
        console.error("ログアウト失敗:", e);
    }
  };

  return { isLoading, setIsLoading, handleLogout };
};
