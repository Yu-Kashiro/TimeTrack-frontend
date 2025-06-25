import { Input } from "@chakra-ui/react/input";
import { Link } from "react-router-dom";
import { Field } from "@chakra-ui/react/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Box } from "@chakra-ui/react/box";
import { MainButton } from "@/lib/utils/MainButton";
import { Layout } from "@/lib/utils/Layout";
import { ErrorMessage } from "@/lib/utils/ErrorMessage";
import { useLoginCheck } from "@/lib/hooks/use-login-check";
import { useSignInForm } from "@/lib/hooks/use-sign-in-form";
import { useState } from "react";

export const SignIn = () => {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const { errorMessage, register, errors, isValid, onSubmit } = useSignInForm();

  useLoginCheck({
    redirectIf: "loggedIn",
    redirectTo: "/work_times",
    onSuccess: () => setIsCheckingLogin(false),
  });

  if (isCheckingLogin) return null;

  return (
    <form onSubmit={onSubmit}>
      <Layout title="ログイン">
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
