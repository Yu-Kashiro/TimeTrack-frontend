import { Input } from "@chakra-ui/react/input";
import { Link } from "react-router-dom";
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
import { Text } from "@chakra-ui/react";

export const SignIn = () => {
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const {
    errorMessage,
    register,
    errors,
    isValid,
    onSubmit,
    isSubmittingLogin,
  } = useSignInForm();

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

        <Box textAlign="center">
          <Link to="../signup">ユーザー登録はこちら</Link>
        </Box>

        <Box
          mt={10}
          p={3}
          bg="blue.50"
          borderRadius="md"
          borderLeft="4px solid"
          borderLeftColor="blue.400"
        >
          <Text fontSize="sm" textAlign="center">
            サーバー起動のため、ログインボタンを押したあと、少し時間がかかる場合があります。
          </Text>
        </Box>
      </Layout>
    </form>
  );
};
