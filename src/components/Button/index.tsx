import React from "react";
import type { ButtonProps } from "./button.interfaces";
import { ButtonVariant } from "./button.interfaces";
import { getButtonVariants } from "./helpers";

export const Button = ({
  children,
  variant = ButtonVariant.PRIMARY,
  ...rest
}: ButtonProps) => {
  return (
    <button className={getButtonVariants(variant)} {...rest}>
      {children}
    </button>
  );
};

export { ButtonVariant } from "./button.interfaces";
