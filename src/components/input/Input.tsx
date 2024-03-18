import { InputHTMLAttributes, forwardRef, useState } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";
import ClosedEye from "../icons/ClosedEye";
import OpenEye from "../icons/OpenEye";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const onPasswordShow = () => {
    setShowPassword(!showPassword);
  };
  let a ;
  if(props.type==="password"){
     a = true
  }
  return (
    <>
      <input
        {...props}
        ref={ref}
        type={showPassword ? "text" : props.type}
        placeholder={props.placeholder}
        className={clsx(styles.input, props.className)}
      />
      {a && 
      <span className={styles["password-toggle-icon"]} onClick={onPasswordShow}>
        {showPassword ? <ClosedEye /> : <OpenEye />}
      </span>
      }
    </>
  );
});

export default Input;
