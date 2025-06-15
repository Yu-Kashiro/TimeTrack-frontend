import { getUser, signUp } from "@/lib/api/auth";
import { Input } from "@chakra-ui/react/input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "@chakra-ui/react/field";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { Box } from "@chakra-ui/react/box";
import Cookies from "js-cookie";
import type { SignUpFormValues } from "@/types/forms";
import { Layout } from "@/lib/utils/Layout";
import { MainButton } from "@/lib/utils/MainButton";
import { ErrorMessage } from "@/lib/utils/ErrorMessage";

export const SignUp = () => {
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
  } = useForm<SignUpFormValues>();

  // react-hook-form
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      const res = await signUp(data);
      console.log("signUpが成功し、レスポンスが帰ってきました。");
      console.log(res);
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("/work_times/registration");
    } catch (e) {
      console.log(e);
      setErrorMessage(
        "新規登録に失敗しました。氏名、メールアドレス、パスワードを確認してください。"
      );
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Layout title="新規登録">
        {/* react-hook-form */}
        <Field.Root invalid={!!errors.name}>
          <Field.Label>氏名</Field.Label>
          <Input {...register("name")} />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

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
          登録する
        </MainButton>

        <ErrorMessage errorMessage={errorMessage} />

        <Box>
          <Link to="../signin">ログインはこちら</Link>
        </Box>
      </Layout>
    </form>
  );
};
