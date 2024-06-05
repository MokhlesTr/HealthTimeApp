/* eslint-disable import/no-anonymous-default-export */
import http from "./axiosContext";
const create = (data) => {
  return http.post("/User", data);
};
const getAll = () => {
  return http.get("/User/");
};
const getOne = (id) => {
  return http.get(`/User/${id}`);
};
const Update = (id, data) => {
  return http.put(`/User/${id}`, data);
};
const deleteOne = (id) => {
  return http.delete(`/User/${id}`);
};
const checkEmail = (email) => {
  return http.get(`/User/email/${email}`);
};
const updatePassword = (id, newPassword, confirmPassword) => {
  return http.patch(`/User/${id}/update-password`, {
    newPassword,
    confirmPassword,
  });
};
export default {
  create,
  checkEmail,
  deleteOne,
  Update,
  getOne,
  getAll,
  updatePassword,
};
