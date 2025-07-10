import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUp } from "../api/auth";
import Cookies from "js-cookie";
import { secureCookieOptions } from "../utils/secureCookieOptions";
import type { SignUpFormValues } from "@/types/signUpFormValues";

export const useSignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmittingSignUp, setIsSubmittingSignUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmittingSignUp(true);
    try {
      const res = await signUp(data);
      Cookies.set(
        "_access_token",
        res.headers["access-token"],
        secureCookieOptions,
      );
      Cookies.set("_client", res.headers["client"], secureCookieOptions);
      Cookies.set("_uid", res.headers["uid"], secureCookieOptions);
    } catch (e) {
      console.log(e);
      setIsSubmittingSignUp(false);
      setErrorMessage(
        "新規登録に失敗しました。氏名、メールアドレス、パスワードを確認してください。",
      );
    }
  });

  return {
    errorMessage,
    register,
    errors,
    isValid,
    onSubmit,
    isSubmittingSignUp,
  };
};
