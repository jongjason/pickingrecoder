import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/authprovider";
import Repository from "../../service/firebase_repository";
import CheckInForm from "../check_in_form/check_in_form";
import CheckInHistories from "../check_in_histories/check_in_histories";
import StateScreen from "../state_screen/state_screen";
import styles from "./main.module.css";

export type StateType = { isworking: boolean; totalKg: number };

export type MainData = {
  state: StateType;
  histories?: HistoryItems;
  records: { [id: string]: DayRecord }[];
};

export type HistoryItem = {
  id: number;
  kg?: number;
  time?: {
    year: number;
    month: number;
    date: number;
    hour: number;
    min: number;
    sec: number;
  };
};

export type HistoryItems = {
  [id: number]: HistoryItem;
};

export type DayRecord = {
  id: number;
  time: {
    year: number;
    month: number;
    date: number;
    hour: number;
    min: number;
    sec: number;
  };
  data: HistoryItems;
  totalKg: number;
};

type State = {
  userId: string;
};

const Main = () => {
  const location = useLocation();
  const state = location.state as State;
  const [workingState, setWorkingState] = useState<StateType>({
    isworking: false,
    totalKg: 0,
  });
  const [historyItems, setHistories] = useState<HistoryItems>({});
  const [visibleForm, setFormVisible] = useState(false);
  const [dayRecords, setRecords] = useState<{ [id: string]: DayRecord }[]>([]);
  const [userId, setUserId] = useState<string>(state.userId);
  const repository = new Repository();

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthChange((user) => {
      !user && navigate("/");
    });
  });

  const onLogout = () => {
    auth.handleSignOut();
  };

  const onLaunch = () => {
    if (workingState.isworking) {
      const id = Date.now();
      const now = new Date();
      const record: DayRecord = {
        id,
        time: {
          year: now.getFullYear(),
          month: now.getMonth() + 1,
          date: now.getDate(),
          hour: now.getHours(),
          min: now.getMinutes(),
          sec: now.getSeconds(),
        },
        data: historyItems,
        totalKg: workingState.totalKg,
      };

      repository.write(userId, record, "record", id);
      repository.write(
        userId,
        { isworking: !workingState.isworking, totalKg: 0 },
        "state"
      );
      repository.remove(userId, "history");

      setHistories({});
      return;
    } else {
      repository.write(
        userId,
        { ...workingState, isworking: !workingState.isworking },
        "state"
      );
    }
  };

  const onCheckIn = () => {
    if (workingState.isworking) {
      setFormVisible(true);
    } else {
      alert("You are not Working");
    }
  };

  const setCloseForm = () => {
    setFormVisible(false);
  };

  useEffect(() => {
    repository.sync(userId, (data: MainData) => {
      setWorkingState(data.state);
      data.histories && setHistories(data.histories);
      setRecords(data.records);
    });
  }, []);

  const onFormSubmit = (kg: number) => {
    const now = new Date();
    const id = Date.now();
    const item: HistoryItem = {
      id,
      kg,
      time: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        date: now.getDate(),
        hour: now.getHours(),
        min: now.getMinutes(),
        sec: now.getSeconds(),
      },
    };

    const newKg = workingState.totalKg + kg;

    const newState = {
      isworking: workingState.isworking,
      totalKg: newKg,
    };

    repository.write(userId, item, "history", item.id);
    repository.write(userId, newState, "state");
  };

  const handleDelbtn = (id: number) => {
    repository.remove(userId, "history", id);

    setHistories(() => {
      const updated = { ...historyItems };
      delete updated[id];
      return updated;
    });
  };

  return (
    <div className={styles.main}>
      <section className={styles.header}>
        <Link to="/main/history" state={dayRecords}>
          go to History
        </Link>
        <h1 className={styles.title}>Total Kg {workingState.totalKg} kg</h1>
        <button className={styles.signOutBtn} onClick={onLogout}>
          Log out
        </button>
      </section>
      <section className={styles.main__contents}>
        <StateScreen isWorking={workingState.isworking} />
        <CheckInHistories
          historyItems={historyItems}
          handleDelbtn={handleDelbtn}
        />
      </section>
      <section className={styles.footer}>
        <button className={styles.launcherBtn} onClick={onLaunch}>
          {workingState.isworking ? "Stop" : "Start"}
        </button>
        <button className={styles.checkInBtn} onClick={onCheckIn}>
          Check-In
        </button>
      </section>
      {visibleForm && (
        <CheckInForm setCloseForm={setCloseForm} onFormSubmit={onFormSubmit} />
      )}
    </div>
  );
};

export default Main;
