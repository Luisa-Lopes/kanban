export interface IResponse<T> {
  status: boolean;
  message: string;
  dados: T;
}
