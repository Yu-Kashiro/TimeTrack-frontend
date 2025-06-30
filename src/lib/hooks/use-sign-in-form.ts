import type { SignInFormValues } from "@/types/auth-forms";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";

export const useSignInForm = () => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormValues>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn(data);

      const cookieOptions = {
        secure: true,
        sameSite: 'strict' as const,
      };

      Cookies.set("_access_token", res.headers["access-token"], cookieOptions);
      Cookies.set("_client", res.headers["client"], cookieOptions);
      Cookies.set("_uid", res.headers["uid"], cookieOptions);
      navigate("/work_times/registration");
    } catch (e) {
        console.log(e);
      setErrorMessage(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
    }
  });

  return { errorMessage, register, errors, isValid, onSubmit };

};