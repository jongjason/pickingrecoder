import React, { useEffect } from "react";
import { HistoryItem, HistoryItems } from "../main/main";
import styles from "./check_in_histories.module.css";

type CheckInHistoriesProps = {
  historyItems: HistoryItems;
  handleDelbtn: (id: number) => void;
};

type ItemProps = {
  item: HistoryItem;
  handleDelbtn: (id: number) => void;
};

const CheckInHistories = ({
  historyItems,
  handleDelbtn,
}: CheckInHistoriesProps) => {
  return (
    <div className={styles.container}>
      <ul className={styles.items}>
        {Object.keys(historyItems).map((key) => (
          <Item
            item={historyItems[parseInt(key)]}
            key={key}
            handleDelbtn={handleDelbtn}
          />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item, handleDelbtn }: ItemProps) => {
  return (
    <li className={styles.item}>
      <h2 className={styles.kg}>{item.kg} kg</h2>
      <div className={styles.item__time}>
        <p>
          {item.time?.hour}h {item.time?.min}m {item.time?.sec}s
        </p>
      </div>
      <button className={styles.delBtn} onClick={() => handleDelbtn(item.id)}>
        X
      </button>
    </li>
  );
};

export default CheckInHistories;
