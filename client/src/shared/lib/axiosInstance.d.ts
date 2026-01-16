import type { AxiosInstance } from "axios";

declare const axiosInstance: AxiosInstance;
export function setAccessToken(token: string): void;
export default axiosInstance;

