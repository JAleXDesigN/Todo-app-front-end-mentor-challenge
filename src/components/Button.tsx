import type { ButtonHTMLAttributes, FC } from "react";

import { mergeClassNames } from "../helpers";

import styles from "./Button.module.scss";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends Omit<ButtonAttributes, "children" | "className"> {
  label: string;
  variant: "filter" | "clear";
  active?: boolean;
}

const Button: FC<ButtonProps> = ({
  type = "button",
  label,
  variant,
  active,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={mergeClassNames({
        [styles.root]: true,
        [styles[variant]]: variant,
        [styles.active]: active && variant === "filter",
      })}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
