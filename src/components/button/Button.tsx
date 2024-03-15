import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(styles.button, props.className)}
      {...props}
    >
      <span className={styles["button-text"]}>{props.children}</span>
    </button>
  );
});

export default Button;
