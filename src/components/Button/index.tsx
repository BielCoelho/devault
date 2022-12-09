import React from "react";

import type { IButtonProps } from "./button.interfaces";
import { ButtonVariant } from "./button.interfaces";
import { getButtonVariants } from "./helpers";

export const Button = ({
  children,
  variant = ButtonVariant.PRIMARY,
  ...rest
}: IButtonProps) => {
  return (
    <button className={getButtonVariants(variant)} {...rest}>
      {children}
    </button>
  );
};

Button.displayName = "ButtonComponent";

export { ButtonVariant } from "./button.interfaces";
