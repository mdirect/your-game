type AuthResponse = {
  accessToken?: string;
  user?: unknown;
  message?: string;
};

export default class UserApi {
  static signup(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse>;
  static login(userData: { email: string; password: string }): Promise<AuthResponse>;
  static logout(): Promise<AuthResponse>;
}

