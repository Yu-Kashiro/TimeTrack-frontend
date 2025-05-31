import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@chakra-ui/react/button";
import { Field } from "@chakra-ui/react/field";
import { Input } from "@chakra-ui/react/input";
import { Stack } from "@chakra-ui/react/stack";
import { useForm } from "react-hook-form";

interface FormValues {
  username: string;
  password: string;
}

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.username}>
          <Field.Label>ユーザー名</Field.Label>
          <Input placeholder="yokkaichi123" {...register("username")} />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>メールアドレス</Field.Label>
          <Input placeholder="yokkaichi@example.com" />
        </Field.Root>

        <Field.Root invalid={!!errors.password}>
          <Field.Label>パスワード</Field.Label>
          <PasswordInput {...register("password")} />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" w="100%">
          Submit
        </Button>
      </Stack>
    </form>
  );
};
