import { onValue, ref, remove, set } from "firebase/database";
import { HistoryItem, DayRecord, StateType } from "./../components/main/main";
import { database } from "./firebase";
type dataType = "state" | "record" | "history";

type Item = HistoryItem | DayRecord | StateType;

class Repository {
  write(userId: string, data: Item, type: dataType, id?: number) {
    const path = this.getPath(type);
    set(
      ref(
        database,
        id ? `${userId + "/" + path + "/" + id}` : `${userId + "/" + path}`
      ),
      data
    );
  }

  remove(userId: string, type: dataType, id?: number) {
    const path = this.getPath(type);
    const _ref = ref(
      database,
      id ? `${userId + "/" + path + "/" + id}` : `${userId + "/" + path}`
    );
    remove(_ref);
  }

  sync(userId: string, cb: (data: any) => void) {
    const _ref = ref(database, userId);
    onValue(_ref, (snapshot) => {
      const data = snapshot.val();
      data && cb(data);
    });
  }

  protected getPath(type: dataType) {
    switch (type) {
      case "state":
        return "state";
      case "record":
        return "records";
      case "history":
        return "histories";
    }
  }
}

export default Repository;
