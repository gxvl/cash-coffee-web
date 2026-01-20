import type { AxiosResponse } from "axios";

import { UserDTO, UserEntity, UserUpdateDTO } from "@/common/entities/user";

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

interface UserApiResponse {
  statusCode: number;
  message: string;
  path: string;
  data: string; // JSON stringified UserEntity
}

/**
 * Função para buscar um usuário por ID.
 * @param userId - O ID do usuário.
 */
export const getUserById = (
  userId: string
): Promise<AxiosResponse<UserApiResponse>> => {
  return api.get<UserApiResponse>("/users", {
    params: {
      id: userId
    }
  });
};

/**
 * Função para atualizar os dados de um usuário.
 * Assim como na criação, enviamos os dados e esperamos a entidade completa de volta.
 * @param userData - Os dados do usuário a serem atualizados.
 */
export const updateUser = (
  userData: UserUpdateDTO
): Promise<AxiosResponse<UserEntity>> => {
  // A requisição será um PUT para a URL: baseURL + '/users'
  // Nota: Muitas APIs esperam um ID na URL para atualizações (ex: /users/123).
  // Estamos seguindo a estrutura da sua URL informada.
  return api.put("/users", userData);
};

interface UploadPhotoResponse {
  statusCode: number;
  message: string;
  path: string;
  data: string;
}

/**
 * Função para fazer upload da foto de perfil do usuário.
 * @param userId - O ID do usuário.
 * @param imageFile - O arquivo de imagem.
 */
export const uploadUserPhoto = (
  userId: string,
  imageFile: File
): Promise<AxiosResponse<UploadPhotoResponse>> => {
  const formData = new FormData();
  formData.append("UserId", userId);
  formData.append("Image", imageFile);

  return api.put("/users/upload-photo", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const getUserPhotoUrl = (
  userId: string
): Promise<AxiosResponse<UploadPhotoResponse>> => {
  return api.get<UploadPhotoResponse>(`/users/${userId}/load-photo`);
};

export const updateShopStatus = (
  shopId: string,
  isOpenShop: boolean
): Promise<AxiosResponse<void>> => {
  return api.put("/users/shop/open-closed", {
    shopId,
    isOpenShop
  });
};
