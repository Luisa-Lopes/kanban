import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};
