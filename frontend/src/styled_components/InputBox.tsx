import React from "react";
import styles from "./styles/InputBox.module.css";

interface InputBoxProps {
  label: string;
  type: string;
  value: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ label, type, value, placeHolder, onChange }) => {
  return (
    <div className={styles.inputBox}>
      <label>{label}</label>
      <input type={type} value={value} placeholder={placeHolder} onChange={onChange} />
    </div>
  );
};

export default InputBox;
