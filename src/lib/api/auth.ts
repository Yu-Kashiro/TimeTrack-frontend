import Cookies from "js-cookie";
import { client } from "./client";
import type { SignInFormValues } from "@/types/signInFormValues";
import type { SignUpFormValues } from "@/types/signUpFormValues";
import { getAuthHeaders } from "../utils/getAuthHeaders";

export const signUp = (params: SignUpFormValues) => {
  return client.post("auth", params);
};

export const signIn = (params: SignInFormValues) => {
  return client.post("auth/sign_in", params);
};

export const signOut = async () => {
  const headers = getAuthHeaders();
  if (!headers) return;

  await client.delete("/auth/sign_out", { headers });

  Cookies.remove("_access_token");
  Cookies.remove("_client");
  Cookies.remove("_uid");
};

export const getUser = () => {
  const headers = getAuthHeaders();
  if (!headers) return;

  return client.get("/auth/sessions", { headers });
};


