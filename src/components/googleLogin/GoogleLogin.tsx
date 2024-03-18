import { useGoogleLogin } from "@react-oauth/google";
import styles from "./GoogleLogin.module.scss";
const GoogleLogin = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
    },
  });
  return (
    <button
      type="button"
      className={styles.google}
      onClick={() => googleLogin()}
    >
      <img src="/Google.png" />
      Google
    </button>
  );
};

export default GoogleLogin;
