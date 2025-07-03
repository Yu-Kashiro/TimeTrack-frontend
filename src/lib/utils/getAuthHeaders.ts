import Cookies from "js-cookie";

export const getAuthHeaders = () => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");
  if (!accessToken || !clientToken || !uid) return null;
  return {
    "access-token": accessToken,
    client: clientToken,
    uid: uid,
  };
};