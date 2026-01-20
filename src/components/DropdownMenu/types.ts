import { ReactNode } from "react";

export interface DropdownMenuItem {
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  subItems?: DropdownMenuItem[];
}

export interface DropdownMenuGroup {
  items: DropdownMenuItem[];
  separator?: boolean;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  label?: string;
  groups: DropdownMenuGroup[];
  align?: "start" | "center" | "end";
  width?: string;
}
