export interface LoginCredentials {
  email: string;
  password: string;
  originApplication: number;
}

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  path: string;
  data: T;
}

interface LoginData {
  accessToken: string;
  userId: string;
}

// A resposta de login completa
export type LoginResponse = ApiResponse<LoginData>;
export type RawAPIResponse = ApiResponse<string>;
