import type { ComponentPropsWithoutRef } from "react";
import * as LucideIcons from "react-icons/lu";

type LucideIconName = keyof typeof LucideIcons;

export function LucideIcon({ name, ...props }: ComponentPropsWithoutRef<"svg"> & { name: LucideIconName }) {
    const Icon = LucideIcons[name];
    if (!Icon) return null;
    return (<Icon {...props} strokeWidth={1.5} />);
}
