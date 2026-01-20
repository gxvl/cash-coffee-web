"use client";

import { createContext, useContext, useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { LoginCredentials, RawAPIResponse } from "@/services/auth";
import { authServiceLogin } from "@/services/userService";

import api from "../services/api";

interface AuthContextType {
  authToken: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<RawAPIResponse>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!authToken;
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await authServiceLogin(credentials);

      const responseData = JSON.parse(response.data.data);
      console.log(responseData);

      const token = responseData.AccessToken;
      const userId = responseData.UserId;

      if (!token) {
        throw new Error("Token não encontrado na resposta da API.");
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId);
      setAuthToken(token);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return response.data;
    } catch (err) {
      console.error("Falha no login:", err);
      // Você pode lançar um erro ou lidar com ele de outra forma
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setAuthToken(null);
    delete api.defaults.headers.common.Authorization;
    router.push("/login"); // Redireciona para a página de login
  };

  // Efeito para verificar o token no localStorage ao carregar a página
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setAuthToken(storedToken);
      api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
    }
    setLoading(false); // Marca como não mais em loading após a verificação
  }, []);

  return (
    <AuthContext.Provider
      value={{ authToken, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
