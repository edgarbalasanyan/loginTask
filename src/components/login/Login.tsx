import Button from "../button/Button";
import Input from "../input/Input";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={styles.login}>
      <img src="../../../public/Logo.png" alt="Qencode logo" />
      <h2 className={styles.title}>Log in to your account</h2>
      <div className={styles["login-actions"]}>
        <div className={styles["signin-options"]}>
          <Button>Google</Button>
          <Button>Github</Button>
        </div>
        <div className={styles.lines}>
          <img src="../../../public/Line.png" alt="line" />
          <span>OR</span>
          <img src="../../../public/Line.png" alt="line" />
        </div>
        <Input placeholder="Work mail" />
        <Button>Log in to Qencode</Button>
        <p className={styles["sign-up"]}>
          Is your company new to Qencode? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
