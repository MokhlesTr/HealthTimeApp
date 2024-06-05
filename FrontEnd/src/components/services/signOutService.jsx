// SignOutService.js
import http from "./axiosContext";
const signOut = () => {
  return http.get("/auth/signout");
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signOut,
};
