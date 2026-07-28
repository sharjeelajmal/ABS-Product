"use client";

import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

type Common = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type AsLink = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

type AsButton = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

export function SiteButton({
  children,
  variant = "primary",
  className,
  ...props
}: AsLink | AsButton) {
  const classes = cn(
    "btn-uiverse",
    variant === "primary" ? "btn-uiverse-primary" : "btn-uiverse-secondary",
    className
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props as AsLink;
    return (
      <a href={href} className={classes} {...rest}>
        <span className="btn-uiverse-label">{children}</span>
      </a>
    );
  }

  const { type, ...buttonRest } = props as AsButton;
  return (
    <button type={type ?? "button"} className={classes} {...buttonRest}>
      <span className="btn-uiverse-label">{children}</span>
    </button>
  );
}
