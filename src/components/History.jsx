import React, { useState, useContext, useEffect } from "react"
import { DataContext } from "../hooks/DataContext";

export default function History() {
    const { currentHistory, removeFromDB } = useContext(DataContext)

    const [listElements, setListElements] = useState("")

    useEffect(() => {
        if (currentHistory) {
            const elements = currentHistory.map(data => (
                <li
                    className="list-item pointer"
                    key={data[0]}
                    id={data[0]}
                    onClick={e => removeFromDB(e.target.id, "shoppingHistory")}
                >{data[1]}</li>
            ));
            setListElements(elements);
        }
    }, [currentHistory]);

    return (
        <>
            <h3 className="history-title font">History</h3>
            <div className="list-item-container">
                <ul className="list-ul">
                    {listElements}
                </ul>
            </div>

        </>
    )
}
