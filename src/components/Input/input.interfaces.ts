import type { InputHTMLAttributes } from "react";

export enum InputVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
}

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}
