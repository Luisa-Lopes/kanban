import { IResponse } from "./Response";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type ILoginResponse = IResponse<string>;

export type IRegisterResponse = IResponse<string>;
