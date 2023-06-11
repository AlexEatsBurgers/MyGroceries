import React, { useState, useContext, useEffect } from "react"
import { DataContext } from "./src/hooks/DataContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { update } from "firebase/database"


export default function ShoppingList() {
  const { currentData, pushToDB, removeFromDB } = useContext(DataContext)
  const [recentlyDeleted, setRecentlyDeleted] = useState([])
  const [newItem, setNewItem] = useState("")
  const [listElements, setListElements] = useState("")

  useEffect(() => {
    if (currentData) {
      const elements = currentData.map(data => (
        <li
          className="list-item pointer"
          key={data[0]}
          id={data[0]}
          onClick={e => {removeFromDB(e.target.id, "shoppingList"),
              addToRecentlyDeleted(data[1])}}
        >{data[1]}</li>
      ));
      setListElements(elements);
    }
  }, [currentData]);

  useEffect(() => {
    const fetchedData = localStorage.getItem("deletedItems");
    if (fetchedData) {
      const parsedData = JSON.parse(fetchedData);
      setRecentlyDeleted(parsedData);
    }
  }, []);

  function addToRecentlyDeleted(item){
    if (recentlyDeleted.length < 4) {
      setRecentlyDeleted( prev => [item, ...prev])
    } else {
      setRecentlyDeleted(prev => {
        const updatedArray = [...prev];
        updatedArray.pop();
        return [item, ...updatedArray];
      })
    }
  }

  useEffect( () => {
    setTimeout( () => {
      localStorage.setItem("deletedItems", JSON.stringify(recentlyDeleted))
    }, 20)
  }, [recentlyDeleted])

  function restoreDeleted() {
    const fetchedData = localStorage.getItem("deletedItems");
    const lastItem = JSON.parse(fetchedData)[0];
    pushToDB(null, lastItem);
    setRecentlyDeleted( prev => {
      const updatedArray = [...prev]
      updatedArray.shift()
      return [...updatedArray]
    })
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    pushToDB(e, newItem);
    setNewItem("");
  };

  return (
    <div className="sl-container">
      <form>
        <div className="list-input-container">
          <input
            value={newItem}
            className="font list-input"
            type="text"
            placeholder="Add item"
            onChange={e => setNewItem(e.target.value)}
          />
        </div>
        <button
          className="font list-button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </form>
      <div className="undo-button-container">
        <FontAwesomeIcon onClick={restoreDeleted} icon={faRotateLeft} className="undo-button" />
      </div>
      <div className="list-item-container">
        <ul className="list-ul">
          {listElements}
        </ul>
      </div>
    </div>
  )
  
}