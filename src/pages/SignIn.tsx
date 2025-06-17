import { getUser, signIn } from "@/lib/api/auth";
import { Input } from "@chakra-ui/react/input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "@chakra-ui/react/field";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { Box } from "@chakra-ui/react/box";
import Cookies from "js-cookie";
import { MainButton } from "@/lib/utils/MainButton";
import { Layout } from "@/lib/utils/Layout";
import type { SignInFormValues } from "@/types/forms";
import { ErrorMessage } from "@/lib/utils/ErrorMessage";

export const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await getUser();
        if (res && res.data && res.data.isLogin) {
          navigate("/work_times/registration");
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkLoginStatus();
  }, [navigate]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  // react-hook-form
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn(data);
      console.log("signInが成功し、レスポンスが帰ってきました。");
      console.log(res);
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("/work_times/registration");
    } catch (e) {
      console.log(e);
      setErrorMessage(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Layout title="ログイン">
        {/* react-hook-form */}
        <Field.Root invalid={!!errors.email}>
          <Field.Label>メールアドレス</Field.Label>
          <Input {...register("email")} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>パスワード</Field.Label>
          <PasswordInput {...register("password")} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <MainButton colorPalette="blue" color="black">
          ログインする
        </MainButton>

        <ErrorMessage errorMessage={errorMessage} />

        <Box>
          <Link to="../signup">ユーザー登録はこちら</Link>
        </Box>

        <Box>
          <Link to="">パスワードを再設定</Link>
        </Box>
      </Layout>
    </form>
  );
};
