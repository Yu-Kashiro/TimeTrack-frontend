import { Input } from "@chakra-ui/react/input";
import { Link } from "react-router-dom";
import { Field } from "@chakra-ui/react/field";
import { PasswordInput } from "@/lib/components/defaultChakraUIComponents/password-input";
import { Box } from "@chakra-ui/react/box";
import { Layout } from "@/lib/components/Layout";
import { MainButton } from "@/lib/components/MainButton";
import { ErrorMessage } from "@/lib/components/ErrorMessage";
import { useLoginCheck } from "@/lib/hooks/use-login-check";
import { useState } from "react";
import { useSignUpForm } from "@/lib/hooks/use-sign-up-form";

export const SignUp = () => {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const { errorMessage, register, errors, isValid, onSubmit } = useSignUpForm();

  useLoginCheck({
    redirectIf: "loggedIn",
    redirectTo: "/work_times",
    onSuccess: () => setIsCheckingLogin(false),
  });

  if (isCheckingLogin) return null;

  return (
    <form onSubmit={onSubmit}>
      <Layout title="新規登録">
        <Field.Root invalid={!!errors.name}>
          <Field.Label>氏名</Field.Label>
          <Input {...register("name", { required: "氏名は必須です" })} />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label>メールアドレス</Field.Label>
          <Input
            {...register("email", { required: "メールアドレスは必須です" })}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>パスワード</Field.Label>
          <PasswordInput
            {...register("password", { required: "パスワードは必須です" })}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <MainButton colorPalette="blue" color="black" disabled={!isValid}>
          登録する
        </MainButton>

        <ErrorMessage errorMessage={errorMessage} />

        <Box textAlign="center">
          <Link to="../signin">ログインはこちら</Link>
        </Box>
      </Layout>
    </form>
  );
};
