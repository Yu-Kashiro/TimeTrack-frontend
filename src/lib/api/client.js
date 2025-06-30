import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

import Cookies from "js-cookie";

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

    const cookieOptions = {
      secure: true,
      sameSite: 'strict',
      httpOnly: false,
    };
    if (newToken) Cookies.set("_access_token", newToken, cookieOptions);
    if (newClient) Cookies.set("_client", newClient, cookieOptions);
    if (newUid) Cookies.set("_uid", newUid, cookieOptions);

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);