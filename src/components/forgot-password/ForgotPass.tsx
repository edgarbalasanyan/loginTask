import { useForm } from "react-hook-form";
// import styles from "./";

const ForgotPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <img src="../../../public/Logo.png" alt="Qencode logo" />
      <h2 className={styles.title}>Log in to your account</h2>
    </>
  );
};
export default ForgotPass;
