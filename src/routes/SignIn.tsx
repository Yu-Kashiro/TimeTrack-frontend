import { getUser, signIn } from "@/lib/api/auth";
import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Input } from "@chakra-ui/react/input";
import { Stack } from "@chakra-ui/react/stack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Field } from "@chakra-ui/react/field";
import { Heading } from "@chakra-ui/react/typography";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await signIn({ email, password });
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
      <Heading size="2xl" mb={5}>ログイン</Heading>
      <Field.Root>
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

      <Button mb="8px" onClick={login}>
        ログインする
      </Button>

      <Box>
        <Link to="../signup">ユーザー登録はこちら</Link>
      </Box>
      <Box>
        <Link to="">パスワードを再設定</Link>
      </Box>
    </Stack>
  );
};
