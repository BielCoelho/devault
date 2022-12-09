import { ButtonVariant } from "../button.interfaces";

export const getButtonVariants = (variant: ButtonVariant) => {
  const baseClasses =
    "inline-block py-2 px-4 w-full rounded-lg text-base font-bold transition ease-linear duration-50";
  const primaryClasses =
    "bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 active:bg-orange-800 text-white";
  const secondaryClasses =
    "border-2 border-orange-500 text-orange-500 bg-orange-100 active:text-orange-700 hover:border-orange-600 focus:border-orange-600 active:border-orange-800 active:bg-orange-200";

  switch (variant) {
    case ButtonVariant.PRIMARY:
      return `${baseClasses} ${primaryClasses}`;
    case ButtonVariant.SECONDARY:
      return `${baseClasses} ${secondaryClasses}`;
    default:
      return `${baseClasses} ${primaryClasses}`;
  }
};
