import React, { createContext, useState, useContext, useEffect } from "react";
import { onValue, push, ref, remove } from "firebase/database";
import { database } from "./firebase-config"
import { LoginContext } from "./LoginContext";

const DataContext = createContext();

function DataContextProvider({ children }) {
  const { user } = useContext(LoginContext);
  const [currentData, setCurrentData] = useState();
  const [currentHistory, setCurrentHistory] = useState();
  const [userDatabase, setUserDatabase] = useState("");
  const [historicalDatabase, setHistoricalDatabase] = useState("");

  useEffect(() => {
    if (user) {
      if (
        user.uid === "NO2mRenPMwgvm8QYK2rCjzY2J6I3" ||
        user.uid === "cbLyvEf1xFXOoE4wwoXj1BCagtQ2"
      ) {
        setUserDatabase(ref(database, "personal/shoppingList"));
        setHistoricalDatabase(ref(database, "personal/shoppingHistory"));
      } else {
        setUserDatabase(ref(database, `db2023/${user.uid}/shoppingList`));
        setHistoricalDatabase(ref(database, `db2023/${user.uid}/shoppingHistory`));
      }
    }
  }, [user]);

  function pushToDB(e, item) {
    if (e) {
        e.preventDefault();
    }
    push(userDatabase, item);
    push(historicalDatabase, item);
  }

  function removeFromDB(itemid, location) {
    let exactItemLocation;
    if (
      user.uid === "NO2mRenPMwgvm8QYK2rCjzY2J6I3" ||
      user.uid === "cbLyvEf1xFXOoE4wwoXj1BCagtQ2"
    ) {
      exactItemLocation = ref(database, `personal/${location}/${itemid}`);
    } else {
      exactItemLocation = ref(database, `db2023//${user.uid}/${location}/${itemid}`);
    }
    remove(exactItemLocation)
      .then(() => console.log("Item removed from database"))
      .catch(() => console.log("Error removing item"));
  }

  useEffect(() => {
    if (userDatabase) {
      onValue(userDatabase, snapshot => {
        if (snapshot.exists()) {
          let entries = Object.entries(snapshot.val());
          setCurrentData(entries);
        } else {
            setCurrentData([["key", "Cart is empty..."]])
        }
      });
    }
  }, [userDatabase]);

  useEffect(() => {
    if (historicalDatabase) {
      onValue(historicalDatabase, snapshot => {
        if (snapshot.exists()) {
          let entries = Object.entries(snapshot.val());
          setCurrentHistory(entries);
        } else {
            setCurrentHistory([["key", "No history available..."]])
        }
      });
    }
  }, [historicalDatabase]);

  return (
    <DataContext.Provider value={{ pushToDB, removeFromDB, currentData, setCurrentData, currentHistory }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContextProvider, DataContext };
