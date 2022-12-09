import { InputVariant } from "../input.interfaces";

export const getInputVariants = (variant: InputVariant) => {
  const baseClasses =
    "block w-full rounded-lg bg-orange-200 p-2 text-base transition ease-linear duration-50";
  const primaryClasses = "";
  const secondaryClasses = "";

  switch (variant) {
    case InputVariant.PRIMARY:
      return `${baseClasses} ${primaryClasses}`;
    case InputVariant.SECONDARY:
      return `${baseClasses} ${secondaryClasses}`;
    default:
      return `${baseClasses} ${primaryClasses}`;
  }
};
