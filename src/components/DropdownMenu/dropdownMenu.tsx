import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import type {
  DropdownMenuItem as DropdownMenuItemType,
  DropdownMenuProps
} from "./types";

export function Menu({
  trigger,
  label,
  groups,
  align = "start",
  width = "w-56"
}: DropdownMenuProps) {
  const renderMenuItem = (item: DropdownMenuItemType, index: number) => {
    if (item.subItems && item.subItems.length > 0) {
      return (
        <DropdownMenuSub key={index}>
          <DropdownMenuSubTrigger>
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </DropdownMenuSubTrigger>

          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {item.subItems.map(
                (subItem: DropdownMenuItemType, subIndex: number) => (
                  <DropdownMenuItem
                    key={subIndex}
                    onClick={subItem.onClick}
                    disabled={subItem.disabled}
                  >
                    {subItem.icon && (
                      <span className="mr-2">{subItem.icon}</span>
                    )}
                    {subItem.label}
                    {subItem.shortcut && (
                      <DropdownMenuShortcut>
                        {subItem.shortcut}
                      </DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      );
    }

    return (
      <DropdownMenuItem
        key={index}
        onClick={item.onClick}
        disabled={item.disabled}
      >
        {item.icon && <span className="mr-2">{item.icon}</span>}
        {item.label}
        {item.shortcut && (
          <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
        )}
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={width} align={align}>
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <DropdownMenuGroup>
              {group.items.map((item, itemIndex) =>
                renderMenuItem(item, itemIndex)
              )}
            </DropdownMenuGroup>
            {group.separator && groupIndex < groups.length - 1 && (
              <DropdownMenuSeparator />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
