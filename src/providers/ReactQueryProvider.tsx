// src/providers/ReactQueryProvider.tsx
"use client";

import { useState, type ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryProvider({
  children
}: {
  children: ReactNode;
}) {
  // O QueryClient deve ser criado dentro do componente ou via useState
  // para garantir que os dados não sejam compartilhados entre requisições diferentes no Server Side Rendering
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Opções globais (opcional)
            staleTime: 60 * 1000, // 1 minuto
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
