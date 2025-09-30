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
  // A API pode retornar outros dados aqui, como as info do usuário, mas vamos
  // focar no token por enquanto, já que é o que você mencionou.
  // Você pode adicionar: user: UserEntity; se a sua API retornar isso.
}

// A resposta de login completa
export type LoginResponse = ApiResponse<LoginData>;
export type RawAPIResponse = ApiResponse<string>;
