import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";
import Cookies from "js-cookie";
import { secureCookieOptions } from "../utils/secureCookieOptions";

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_TIME_TRACK_API_DOMAIN,
  }),
  { ignoreHeaders: true }
);

client.interceptors.response.use(
  (response) => {
    const newToken = response.headers["access-token"];
    const newClient = response.headers["client"];
    const newUid = response.headers["uid"];

    if (newToken) Cookies.set("_access_token", newToken, secureCookieOptions);
    if (newClient) Cookies.set("_client", newClient, secureCookieOptions);
    if (newUid) Cookies.set("_uid", newUid, secureCookieOptions);

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);