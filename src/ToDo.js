import React, { useState } from "react";

export default function ToDo() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setList([...list, { id: Date.now(), text: task }]);
      setTask(""); // Vide l'input
    }
  };

  const deleteTask = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Ma Liste de Tâches</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Que faut-il faire ?"
      />
      <button onClick={addTask}>Ajouter</button>

      <ul>
        {list.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            {item.text}
            <button
              onClick={() => deleteTask(item.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
