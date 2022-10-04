import React from "react";
import styles from "./state_screen.module.css";

type StateScreenProps = {
  isWorking: boolean;
};

const StateScreen = ({ isWorking }: StateScreenProps) => {
  return (
    <div className={styles.container}>
      <h1>{isWorking ? "Working" : "not Working"}</h1>
    </div>
  );
};

export default StateScreen;
