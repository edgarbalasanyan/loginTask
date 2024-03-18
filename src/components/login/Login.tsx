import { useForm } from "react-hook-form";
import Button from "../button/Button";
import Input from "../input/Input";
import styles from "./Login.module.scss";
import "../../sass/typography.scss";
// import { GoogleLogin } from "@react-oauth/google";
import axios from "../../api/axios";
import { useState } from "react";
import { AxiosResponse } from "axios";
import Layout from "../layout/Layout";
import GoogleButton from "../googleLogin/GoogleLogin";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PWD_REGEX = /^.{8,}$/;
export const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
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
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (err) {
      if (err) {
        SetErrorMsg("Login failed, wrong email or password");
      }
    }
  };

  return (
    <Layout>
      <img src="/Logo.png" alt="Qencode logo" />
      <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>Log in to your account</h2>
        <div className={styles["signin-options"]}>
          <GoogleButton />
          <Button>Github</Button>
          <GoogleLogin onSuccess={function (credentialResponse: CredentialResponse): void {
            console.log(credentialResponse)
          } }/>
        </div>
        <div className={styles.lines}>
          <img src="/Line.png" alt="line" />
          <span>OR</span>
          <img src="/Line.png" alt="line" />
        </div>

        <div className={styles["input-wrapper"]}>
          <Input
            placeholder="Work mail"
            {...register("email", { required: true, pattern: EMAIL_REGEX })}
            className={`${(errors.email || errorMsg) && "inputError"}`}
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
            type="password"
            {...register("password", {
              required: true,
              pattern: PWD_REGEX,
            })}
            className={`${(errors.password || errorMsg) && "inputError"}`}
          />
          <p className={errors.password ? "text-error" : "hidden"}>
            {errors.password?.type === "pattern"
              ? "Invalid password"
              : "Password is required"}
          </p>
          <a href="/forgot-password" className={styles.forgot}>
            Forgot your password?
          </a>
        </div>
        {errorMsg && <div className={styles["text-error"]}>{errorMsg}</div>}
        <Button type="submit">Log in to Qencode</Button>
        <p className={styles["sign-up"]}>
          Is your company new to Qencode? <a href="#">Sign up</a>
        </p>
      </form>
    </Layout>
  );
};

export default Login;
