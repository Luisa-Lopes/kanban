import {
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
} from "@/Interfaces/Auth";
import { getRequest, postRequest } from "./api";

export const login = async (data: ILogin): Promise<ILoginResponse> => {
  const result = await postRequest<ILoginResponse>(`/Auth/login`, data);

  return result.data;
};

export const register = async (data: IRegister): Promise<IRegisterResponse> => {
  const result = await postRequest<IRegisterResponse>(`/Auth/register`, data);

  return result.data;
};

export const validateToken = async (): Promise<{
  email: string;
  token: string;
}> => {
  const result = await getRequest<{
    email: string;
    token: string;
  }>(`/Auth/token`);

  return result.data;
};
