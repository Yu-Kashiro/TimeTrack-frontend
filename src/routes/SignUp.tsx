import { getUser, signUp } from "@/lib/api/auth";
import { Box, Field, Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react/button";
import { Input } from "@chakra-ui/react/input";
import { Stack } from "@chakra-ui/react/stack";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await signUp({ name, email, password });
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("/time-entry");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await getUser();
        if (res && res.data && res.data.isLogin) {
          navigate("/time-entry");
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkLoginStatus();
  }, [navigate]);

  return (
    <Stack justify="center">
      <Heading size="2xl" mb={5}>新規登録</Heading>
      <Field.Root>
        <Field.Label>名前</Field.Label>
        <Input
          type="text"
          autoComplete="name"
          mb="16px"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Field.Label>メールアドレス</Field.Label>
        <Input
          type="email"
          mb="16px"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Field.Label>パスワード</Field.Label>
        <Input
          type="password"
          mb="16px"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Field.Root>

      <Button mb="8px" onClick={register}>
        登録する
      </Button>
      <Box>
        <Link to="../signin">ログインはこちら</Link>
      </Box>
    </Stack>
  );
};
