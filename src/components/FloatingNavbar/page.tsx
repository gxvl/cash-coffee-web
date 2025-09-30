"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const FloatingNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden">
      <nav className="flex items-center justify-around gap-x-10 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <Link
          href="/home"
          className={`${pathname === "/home" && "scale-150"} group flex h-16 w-16 transform flex-col items-center justify-center rounded-full text-gray-500 transition-all duration-300 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700`}
        >
          <Image
            src={
              pathname === "/home"
                ? "/icons/coffee-full.png"
                : "/icons/coffee.png"
            }
            width={24}
            height={24}
            alt="Cardápio"
            className="mb-1"
          />
        </Link>

        {/* Ícone 2: Perfil */}
        <Link
          href="/wallet"
          className={`${pathname === "/wallet" && "scale-150"} group flex h-16 w-16 transform flex-col items-center justify-center rounded-full text-gray-500 transition-all duration-300 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700`}
        >
          <Image
            src={
              pathname === "/wallet"
                ? "/icons/wallet-full.png"
                : "/icons/wallet.png"
            }
            width={28}
            height={28}
            alt="Cardápio"
            className="mb-1"
          />{" "}
        </Link>

        {/* Ícone 3: Pedidos (Exemplo) */}
        <Link
          href="/orders"
          className={`${pathname === "/orders" && "scale-150"} group flex h-16 w-16 transform flex-col items-center justify-center rounded-full text-gray-500 transition-all duration-300 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700`}
        >
          <Image
            src={
              pathname === "/orders"
                ? "/icons/clipboard-full.png"
                : "/icons/clipboard.png"
            }
            width={24} // Ajustado para um tamanho mais consistente
            height={24} // Ajustado para um tamanho mais consistente
            alt="Pedidos"
            className="mb-1"
          />
        </Link>
      </nav>
    </div>
  );
};
