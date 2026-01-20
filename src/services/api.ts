import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor para adicionar token de autenticação em todas as requisições
api.interceptors.request.use(
  (config) => {
    // Busca o token do localStorage
    const token = localStorage.getItem("authToken");

    // Se o token existir, adiciona no header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta (opcional mas útil)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber 401, pode redirecionar para login
    if (error.response?.status === 401) {
      // Remove token inválido
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");

      // Redireciona para login (apenas se estiver no browser)
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
