import { Input } from "@chakra-ui/react/input";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "@chakra-ui/react/field";
import { PasswordInput } from "@/lib/components/defaultChakraUIComponents/password-input";
import { Box } from "@chakra-ui/react/box";
import { MainButton } from "@/lib/components/MainButton";
import { Layout } from "@/lib/components/Layout";
import { ErrorMessage } from "@/lib/components/ErrorMessage";
import { useLoginCheck } from "@/lib/hooks/useLoginCheck";
import { useSignInForm } from "@/lib/hooks/useSignInForm";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react/spinner";
import { guestSignIn } from "@/lib/api/auth";
import { Button } from "@chakra-ui/react/button";

export const SignIn = () => {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    errorMessage,
    register,
    errors,
    isValid,
    onSubmit,
    isSubmittingLogin,
  } = useSignInForm();

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

        {isSubmittingLogin ? (
          <Box textAlign="center">
            <Spinner size="sm" />
          </Box>
        ) : (
          <MainButton colorPalette="blue" color="black" disabled={!isValid}>
            ログインする
          </MainButton>
        )}

        <ErrorMessage errorMessage={errorMessage} />

        {isLoading ? (
          <Box textAlign="center">
            <Spinner size="sm" />
          </Box>
        ) : (
          <Button
            variant="subtle"
            size="xl"
            type="button"
            mt="2"
            onClick={handleGuestLogin}
          >
            ゲストログイン
          </Button>
        )}

        <Box textAlign="center">
          <Link to="../signup">ユーザー登録はこちら</Link>
        </Box>
      </Layout>
    </form>
  );
};
