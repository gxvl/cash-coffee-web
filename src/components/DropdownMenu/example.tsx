/**
 * Exemplo de uso do ReusableDropdownMenu
 *
 * Este arquivo demonstra como utilizar o componente reutilizável de dropdown menu
 */

import { LogOut, Settings, User } from "lucide-react";

import { ReusableDropdownMenu } from "@/components/DropdownMenu/dropdownMenu";
import type { DropdownMenuGroup } from "@/components/DropdownMenu/types";
import { Button } from "@/components/ui/button";

export function DropdownMenuExample() {
  // Defina os grupos de itens do menu
  const menuGroups: DropdownMenuGroup[] = [
    {
      items: [
        {
          label: "Perfil",
          icon: <User className="h-4 w-4" />,
          shortcut: "⇧⌘P",
          onClick: () => console.log("Perfil clicado")
        },
        {
          label: "Configurações",
          icon: <Settings className="h-4 w-4" />,
          shortcut: "⌘S",
          onClick: () => console.log("Configurações clicado")
        }
      ],
      separator: true // Adiciona separador após este grupo
    },
    {
      items: [
        {
          label: "Sair",
          icon: <LogOut className="h-4 w-4" />,
          shortcut: "⇧⌘Q",
          onClick: () => console.log("Logout")
        }
      ]
    }
  ];

  return (
    <ReusableDropdownMenu
      trigger={<Button variant="outline">Abrir Menu</Button>}
      label="Minha Conta"
      groups={menuGroups}
      align="start"
      width="w-56"
    />
  );
}

/**
 * Exemplo com submenus
 */
export function DropdownMenuWithSubitems() {
  const menuGroups: DropdownMenuGroup[] = [
    {
      items: [
        {
          label: "Convidar usuários",
          subItems: [
            {
              label: "Email",
              onClick: () => console.log("Convidar por email")
            },
            {
              label: "WhatsApp",
              onClick: () => console.log("Convidar por WhatsApp")
            }
          ]
        }
      ]
    }
  ];

  return (
    <ReusableDropdownMenu
      trigger={<Button>Ações</Button>}
      groups={menuGroups}
    />
  );
}

/**
 * Exemplo simples sem ícones
 */
export function SimpleDropdownMenu() {
  const menuGroups: DropdownMenuGroup[] = [
    {
      items: [
        {
          label: "Editar",
          onClick: () => console.log("Editar")
        },
        {
          label: "Duplicar",
          onClick: () => console.log("Duplicar")
        },
        {
          label: "Excluir",
          onClick: () => console.log("Excluir"),
          disabled: true // Item desabilitado
        }
      ]
    }
  ];

  return (
    <ReusableDropdownMenu
      trigger={<Button size="sm">Opções</Button>}
      groups={menuGroups}
      align="end"
    />
  );
}
