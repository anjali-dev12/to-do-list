import React, { useState, useEffect } from "react"
import './App.css'
function App() {

  const getLocalItem = () => {
    try {
      let list = localStorage.getItem("lists")

      return list ? JSON.parse(list) : [];
    } catch (error) {
      console.log("Error Parsing localStorage data", error);
      return [];
    }
  };

   

  
  console.log("Local Storage Data:", localStorage.getItem("lists"))

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(getLocalItem);


  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");

  function addItem() {
    if (!newItem) {
      alert("Please Enter The Task ")
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    }
    setItems(oldList => [...oldList, item]);
    setNewItem("");
  }

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  function deleteAll() {
    setItems([]);
  }

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  function editItem(id, newText) {
    let currentItem = items.find((item) => item.id === id)
    if (!currentItem) return;
    const newItem = {
      id: currentItem.id,
      value: newText,
    }

    deleteItem(id);
    setItems((oldList) => [...oldList, newItem]);
    setUpdatedText("");
    setShowEdit(-1);
  }

  console.log(newItem)

  return (
    <>
      <h1 className="header" align="center">TO Do List</h1>

      <div align="center">

        <input type="text"
          placeholder="Add a task"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </div>

      <div align="center">
        <button className="btn" onClick={() => addItem()}> Add Task</button>
      </div>

      <ol>
        <div align="center">
          {items.map((item) => (


            <li className="listing" key={item.id} onClick={() => setShowEdit(item.id)}>{item.value}
              <button className="remove" onClick={() => deleteItem(item.id)}>Remove Task</button>

              {showEdit === item.id && (
                <div>
                  <input
                    type="text"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                  />

                  <button className="update" onClick={() => {
                    
                    editItem(item.id, updatedText);
                    setTimeout(() => setShowEdit(null), 0)


                  }}>
                    Update Task</button>
                </div>


              )}
            </li>
          ))}
        </div>
      </ol>
      <div align="center">
        <button className="deleteAll" onClick={() => deleteAll()}>Delete All</button>
      </div>
    </>
 
    
  

  )
}

export default App
