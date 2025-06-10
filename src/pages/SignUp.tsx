import { getUser, signUp } from "@/lib/api/auth";
import { Button } from "@chakra-ui/react/button";
import { Input } from "@chakra-ui/react/input";
import { Stack } from "@chakra-ui/react/stack";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "@chakra-ui/react/field";
import { Heading } from "@chakra-ui/react/typography";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { Box } from "@chakra-ui/react/box";
import Cookies from "js-cookie";


interface FormValues {
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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

  const onSubmit = handleSubmit( async (data) => {
    console.log(data);
    try {
      const res = await signUp(data);
      console.log(res)
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("/work_times/registration");
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" justify="center">
        <Heading size="2xl" mb={5}>新規登録</Heading>

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

        <Button colorPalette={"blue"} variant="subtle" type="submit" mt={5} color={"black"}>登録する</Button>
        <Box>
          <Link to="../signin">ログインはこちら</Link>
        </Box>

      </Stack>
    </form>
  );
};
