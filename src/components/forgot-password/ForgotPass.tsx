import { useForm } from "react-hook-form";
import styles from "./ForgotPass.module.scss";
import "../../sass/typography.scss";
import Input from "../input/Input";
import Button from "../button/Button";
import { EMAIL_REGEX } from "../login/Login";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useState } from "react";

const ForgotPass = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [errorMsg, SetErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleCancelButtonClick = () => {
    navigate("/login");
  };
  const onSubmit = async () => {
    axios
      .post(
        "/password-reset",
        {
          email: getValues("email"),
          redirect_url: "https://auth-qa.qencode.com/password-set",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => navigate("/reset-password"))
      .catch(() => SetErrorMsg("Failed to reset password"));
  };
  return (
    <Layout>
      <img src="../../../public/Logo.png" alt="Qencode logo" />
      {errorMsg || (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["forgot-form"]}
        >
          <h2 className="title">Forgot Password?</h2>
          <div className={styles["input-wrapper"]}>
            <Input
              placeholder="Enter your email"
              {...register("email", { required: true, pattern: EMAIL_REGEX })}
              className={`${errors.email && "inputError"}`}
            />
            <p className={errors.email ? "text-error" : "hidden"}>
              {errors.email?.type === "pattern"
                ? "Invalid email"
                : "Email is required"}
            </p>
          </div>
          <Button>Send</Button>
          <Button cancelButton={true} onClick={handleCancelButtonClick}>
            Cancel
          </Button>
        </form>
      )}
    </Layout>
  );
};
export default ForgotPass;
