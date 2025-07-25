import React from "react";
import styles from "./styles/LoginSignUpButton.module.css";

interface LoginButtonProps {
  type: "submit" | "reset" | "button";
  disabled: boolean;
  children: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({ type, disabled, children }) => {
  return (
    <button type={type} disabled={disabled} className={styles.loginButton}>
      {children}
    </button>
  );
};

export default LoginButton;
