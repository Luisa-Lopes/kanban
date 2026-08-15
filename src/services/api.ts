import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("user_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getRequest = async <T>(
  url: string,
  params: Record<string, any> = {},
): Promise<{ data: T; status: number }> => {
  const response = await api.get<T>(url, { params });

  return {
    data: response.data,
    status: response.status,
  };
};

export const postRequest = async <T>(
  url: string,
  data: unknown,
): Promise<{ data: T; status: number }> => {
  const response = await api.post<T>(url, data);

  return {
    data: response.data,
    status: response.status,
  };
};

export const putRequest = async <T>(
  url: string,
  data: unknown,
): Promise<{ data: T; status: number }> => {
  const response = await api.put<T>(url, data);

  return {
    data: response.data,
    status: response.status,
  };
};

export const deleteRequest = async <T>(
  url: string,
): Promise<{ data: T; status: number }> => {
  const response = await api.delete<T>(url);

  return {
    data: response.data,
    status: response.status,
  };
};
