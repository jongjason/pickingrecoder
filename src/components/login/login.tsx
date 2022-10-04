import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../provider/authprovider";
import { ProviderType } from "../../service/auth";
import styles from "./login.module.css";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const moveToMain = (data: string) => {
    navigate("/main", {
      state: {
        userId: data,
      },
    });
  };

  const onLogin = (type: ProviderType) => {
    auth.hadleLogin(type).then((data) => {
      moveToMain(data.user.uid);
    });
  };

  return (
    <ul className={styles.box}>
      <li className={styles.list}>
        <button className={styles.button} onClick={() => onLogin("google")}>
          <p className={styles.title}>Sign in With Google</p>
        </button>
      </li>
    </ul>
  );
};

export default Login;
