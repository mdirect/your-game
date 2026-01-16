declare module "../../entities/user/api/UserApi" {
  export default class UserApi {
    static signup(userData: {
      name: string;
      email: string;
      password: string;
    }): Promise<unknown>;
    static login(userData: {
      email: string;
      password: string;
    }): Promise<unknown>;
    static logout(): Promise<unknown>;
  }
}

declare module "../../shared/lib/axiosInstance" {
  import type { AxiosInstance } from "axios";

  const axiosInstance: AxiosInstance;
  export function setAccessToken(token: string): void;
  export default axiosInstance;
}
