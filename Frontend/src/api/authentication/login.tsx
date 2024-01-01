import { axiosClient } from "../axios-client";
import { endpoints } from "../endpoints";

type LoginRequestDTO = {
  name: string;
  password: string;
};

type LoginResponseDTO = {
  access_token: string;
};

export const login = (data: LoginRequestDTO) =>
  axiosClient.post<LoginResponseDTO>(endpoints.login, data);
