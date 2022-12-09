import type { ForwardRefRenderFunction } from "react";
import React, { forwardRef } from "react";

import { getInputVariants } from "./helpers";
import type { IInputProps } from "./input.interfaces";
import { InputVariant } from "./input.interfaces";

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { variant = InputVariant.PRIMARY, ...rest },
  ref
) => {
  return <input className={getInputVariants(variant)} {...rest} ref={ref} />;
};

InputBase.displayName = "InputComponent";

export const Input = forwardRef(InputBase);
