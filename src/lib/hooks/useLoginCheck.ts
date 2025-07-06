import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/auth";

type UseLoginCheckOptions = {
  redirectIf: "loggedIn" | "notLoggedIn";
  redirectTo: string;
  onSuccess: () => void;
};

export const useLoginCheck = ({
  redirectIf,
  redirectTo,
  onSuccess,
}: UseLoginCheckOptions) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await getUser();
        const isLogin = res?.data?.isLogin;
        if (
          (redirectIf === "notLoggedIn" && !isLogin) ||
          (redirectIf === "loggedIn" && isLogin)
        ) {
          navigate(redirectTo);
        } else {
          onSuccess();
        }
      } catch (e) {
        console.error("ログイン確認エラー:", e);
      }
    };
    checkLoginStatus();
  }, [navigate, redirectIf, redirectTo, onSuccess]);
};