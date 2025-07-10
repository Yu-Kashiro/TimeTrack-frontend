import { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { signIn } from "../api/auth";
import { secureCookieOptions } from "../utils/secureCookieOptions";
import type { SignInFormValues } from "@/types/signInFormValues";

export const useSignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormValues>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmittingLogin(true);
    try {
      const res = await signIn(data);
      Cookies.set(
        "_access_token",
        res.headers["access-token"],
        secureCookieOptions,
      );
      Cookies.set("_client", res.headers["client"], secureCookieOptions);
      Cookies.set("_uid", res.headers["uid"], secureCookieOptions);
    } catch (e) {
      console.log(e);
      setIsSubmittingLogin(false);
      setErrorMessage(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      );
    }
  });

  return {
    errorMessage,
    register,
    errors,
    isValid,
    onSubmit,
    isSubmittingLogin,
  };
};
