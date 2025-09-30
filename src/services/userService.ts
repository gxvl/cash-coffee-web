import type { AxiosResponse } from "axios";

import { UserDTO, UserEntity } from "@/common/entities/user";

import api from "./api";
import { LoginCredentials, RawAPIResponse } from "./auth";

/**
 * Função para criar um novo usuário (cadastro).
 * Ela recebe um objeto do tipo UserDTO (sem o 'id') e espera
 * que a API retorne a entidade completa do usuário (UserEntity), agora com 'id'.
 * @param userData - Os dados do novo usuário para o cadastro.
 */
export const createUser = (
  userData: UserDTO
): Promise<AxiosResponse<UserEntity>> => {
  return api.post("/users", userData);
};

/**
 * Função para autenticar um usuário.
 * Recebe as credenciais e envia para o endpoint de login.
 * @param credentials - Objeto com email e senha do usuário.
 */
export const authServiceLogin = (
  credentials: LoginCredentials
): Promise<AxiosResponse<RawAPIResponse>> => {
  return api.post<RawAPIResponse>("/auth/login", credentials);
};

export const passwordRecovery = (
  originApplication: number,
  document: string
): Promise<AxiosResponse<RawAPIResponse>> => {
  return api.put<RawAPIResponse>("/users/password/reset/request", {
    originApplication,
    document
  });
};

export const ValidateCode = (
  email: string,
  codeValidation: number
): Promise<AxiosResponse<RawAPIResponse>> => {
  return api.get<RawAPIResponse>("/users/password/reset/code-validation", {
    params: {
      email,
      codeValidation
    }
  });
};

export const newPassword = (
  userId: string,
  email: string,
  password: string
): Promise<AxiosResponse<RawAPIResponse>> => {
  return api.put<RawAPIResponse>("/users/password/reset/confirm", {
    userId,
    email,
    password
  });
};

export const getUserByDocument = (
  originApplication: number,
  document: string
): Promise<AxiosResponse<RawAPIResponse>> => {
  return api.get<RawAPIResponse>("/users/by-document", {
    params: {
      document,
      originapplication: originApplication // note lowercase 'a'
    }
  });
};

/**
 * Função para atualizar os dados de um usuário.
 * Assim como na criação, enviamos os dados e esperamos a entidade completa de volta.
 * @param userData - Os dados do usuário a serem atualizados.
 */
export const updateUser = (
  userData: UserDTO
): Promise<AxiosResponse<UserEntity>> => {
  // A requisição será um PUT para a URL: baseURL + '/users'
  // Nota: Muitas APIs esperam um ID na URL para atualizações (ex: /users/123).
  // Estamos seguindo a estrutura da sua URL informada.
  return api.put("/users", userData);
};
