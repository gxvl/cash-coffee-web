"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/authContext"; // Ajuste o caminho se necessário

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se a verificação terminou (!loading) e o usuário JÁ ESTÁ autenticado...
    if (!loading && isAuthenticated) {
      // ...redirecione para a página principal da área logada.
      router.push("/home");
    }
  }, [isAuthenticated, loading, router]);

  // Se o usuário não estiver autenticado, permita que ele veja o conteúdo público.
  return <main>{children}</main>;
}
