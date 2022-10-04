import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DayRecord } from "../main/main";
import styles from "./record.module.css";

type RecordItemProps = {
  year: number;
  month: number;
  date: number;
  min: number;
  totalKg: number;
};

const Record = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as { [id: string]: DayRecord }[];

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => {
            navigate(-1);
          }}
        >
          go back
        </button>
        <h2 className={styles.title}>history</h2>
        <section>
          <ul>
            {Object.keys(data).map((key) => (
              <RecordItem day={data[parseInt(key)]} key={key} />
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};

const RecordItem = (props: { day: any }) => {
  const date = props.day.time;

  console.log(props.day);
  return (
    <li className={styles.day__row}>
      <div className={styles.day__date}>
        {date.date}/{date.month}/{date.year}
      </div>
      <p className={styles.day__totalKg}>{props.day.totalKg} Kg</p>
    </li>
  );
};

export default Record;
