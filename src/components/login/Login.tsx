import { useForm } from "react-hook-form";
import Button from "../button/Button";
import Input from "../input/Input";
import styles from "./Login.module.scss";
import "../../sass/typography.scss";
import {
  GoogleLogin,
  // GoogleLoginResponse,
  // GoogleLoginResponseOffline,
} from "react-google-login";
import axios from "../../api/axios";
import { useRef, useState } from "react";
import { AxiosResponse } from "axios";

const clientID =
  "273854726861-iu3dusc2iasbakctis5s60sb20ibimme.apps.googleusercontent.com";
export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@$%]).{8,}$/;
// export const PWD_REGEX = /^(?=.*[a-zA-Z]).{8,}$/;
export const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState("password");
  const [errorMsg, SetErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        "/login",
        JSON.stringify({
          email: getValues("email"),
          password: getValues("password"),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      // const accessToken = response?.data?.accessToken;
    } catch (err) {
      if (err) {
        SetErrorMsg("Login failed, wrong email or password");
      }
    }
  };
  // const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  //   console.log("Login succes! current user: ", res.profileObj);
  // };
  // const onFailure = () => {
  //   console.log("Login failed! ");
  // };
  const onPasswordShow = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };
  console.log(errors)
  return (
    <div className={styles.login}>
      <img src="../../../public/Logo.png" alt="Qencode logo" />
      <h2 className={styles.title}>Log in to your account</h2>

      {errorMsg || (
        <form
          className={styles["login-actions"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles["signin-options"]}>
            <GoogleLogin
              clientId={clientID}
              buttonText="Google"
              cookiePolicy="single_host_origin"
              isSignedIn={true}
              // onSuccess={onSuccess}
              // onFailure={onFailure}
              render={() => (
                <button className="google-button">
                  <img
                    src="../../../public/Google.png"
                    alt="google icon"
                    height="18px"
                    width="18px"
                  />
                  <span>Google</span>
                </button>
              )}
            />
            <Button>Github</Button>
          </div>
          <div className={styles.lines}>
            <img src="../../../public/Line.png" alt="line" />
            <span>OR</span>
            <img src="../../../public/Line.png" alt="line" />
          </div>
          <div className={styles["input-wrapper"]}>
            <Input
              placeholder="Work mail"
              {...register("email", { required: true, pattern: EMAIL_REGEX })}
              className={`${errors.email && "inputError"}`}
            />
            <p className={errors.email ? "text-error" : "hidden"}>
              {errors.email?.type === "pattern"
                ? "Invalid email"
                : "Email is required"}
            </p>
          </div>
          <div className={styles["input-wrapper"]}>
            <Input
              placeholder="Password"
              type={showPassword}
              {...register("password", {
                required: true,
                pattern: PWD_REGEX,
              })}
              ref={passwordRef}
              className={`${errors.password && "inputError"}`}
            />
            <span
              className={styles["password-toggle-icon"]}
              onClick={onPasswordShow}
            >
              aaa <i className="fa-solid fa-eye"></i>
            </span>
            <p className={errors.password ? "text-error" : "hidden"}>
              {errors.password?.type === "pattern"
                ? "Invalid password"
                : "Password is required"}
            </p>
          </div>
          <Button>Log in to Qencode</Button>
          <p className={styles["sign-up"]}>
            Is your company new to Qencode? <a href="#">Sign up</a>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
