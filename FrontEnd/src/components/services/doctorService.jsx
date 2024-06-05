import http from "./axiosContext";

const create = (data) => {
  return http.post("/doctor", data);
};
const getAll = () => {
  return http.get("/doctor/");
};
const getOne = (id) => {
  return http.get(`/doctor/${id}`);
};
const Update = (id, data) => {
  return http.patch(`/doctor/${id}`, data);
};
const deleteOne = (id) => {
  return http.delete(`/doctor/${id}`);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { create, deleteOne, Update, getOne, getAll };
