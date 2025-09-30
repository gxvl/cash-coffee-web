"use client"; // 1. Essencial para usar hooks

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { FloatingNavbar } from "@/components/FloatingNavbar/page";
import { useAuth } from "@/context/authContext"; // 2. Importe o hook de autenticação

export default function AuthenticatedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 3. Use o hook para obter o status de autenticação e o estado de carregamento
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // 4. Efeito para verificar e redirecionar
  useEffect(() => {
    // Se a verificação inicial terminou (!loading) e o usuário NÃO está autenticado...
    if (!loading && !isAuthenticated) {
      // ...redirecione para a página de login.
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]); // Dependências do efeito

  // 5. Enquanto estiver carregando ou se não estiver autenticado, mostre um loader
  if (loading || !isAuthenticated) {
    return <div>Verificando sua sessão...</div>; // Ou um componente de Spinner/Loading mais elegante
  }

  // 6. Se tudo estiver certo (carregado e autenticado), renderize o conteúdo protegido
  return (
    <main>
      {children}
      <FloatingNavbar />
    </main>
  );
}
