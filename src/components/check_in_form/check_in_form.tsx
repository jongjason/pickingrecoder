import React, { useState } from "react";
import { idText } from "typescript";
import styles from "./check_in_form.module.css";

type CheckInFormProps = {
  setCloseForm: () => void;
  onFormSubmit: (kg: number) => void;
};

type ButtonProps = {
  name: string;
  handleSetKg: (value: string) => void;
};

const CheckInForm = ({ setCloseForm, onFormSubmit }: CheckInFormProps) => {
  const [screenKg, setKg] = useState<string>("0");

  const handleSetKg = (value: string) => {
    if (value !== "Ok") {
      if (value == "del") {
        if (screenKg.length == 1) {
          setKg("0");
          return;
        }
        setKg((screenKg) => {
          const updated = screenKg.slice(0, -1);
          return updated;
        });
        return;
      }
      if (value == ".") {
        if (screenKg == "0") {
          return;
        }
        if (screenKg.includes(".")) {
          return;
        }
      }
      if (screenKg == "0") {
        setKg(value);
        return;
      }
      setKg((screenKg) => {
        return screenKg + value;
      });
      return;
    } else {
      setCloseForm();
      onFormSubmit(parseFloat(screenKg));
      setKg("0");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Input</p>
        <button className={styles.container__cancel} onClick={setCloseForm}>
          X
        </button>
      </div>
      <div className={styles.screen}>
        <p className={styles.screen__got}>{screenKg}</p>
        <p className={styles.screen__kg}>kg</p>
      </div>
      <div className={styles.row}>
        <Button name={"1"} handleSetKg={handleSetKg} />
        <Button name={"2"} handleSetKg={handleSetKg} />
        <Button name={"3"} handleSetKg={handleSetKg} />
      </div>
      <div className={styles.row}>
        <Button name={"4"} handleSetKg={handleSetKg} />
        <Button name={"5"} handleSetKg={handleSetKg} />
        <Button name={"6"} handleSetKg={handleSetKg} />
      </div>
      <div className={styles.row}>
        <Button name={"7"} handleSetKg={handleSetKg} />
        <Button name={"8"} handleSetKg={handleSetKg} />
        <Button name={"9"} handleSetKg={handleSetKg} />
      </div>
      <div className={styles.row}>
        <Button name={"."} handleSetKg={handleSetKg} />
        <Button name={"0"} handleSetKg={handleSetKg} />
        <Button name={"del"} handleSetKg={handleSetKg} />
      </div>
      <div className={styles.row}>
        <Button name={"Ok"} handleSetKg={handleSetKg} />
      </div>
    </div>
  );
};

const Button = ({ name, handleSetKg }: ButtonProps) => {
  const onClick = () => {
    handleSetKg(name);
  };

  return (
    <button className={styles.button} onClick={onClick}>
      {name}
    </button>
  );
};

export default CheckInForm;
