import React, { useState, useEffect } from "react";
import "./index.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [persistedTasks, setPersistedTasks] = useState([]);

  useEffect(() => {
    // Fetch from API or localStorage
    const storedTasks = JSON.parse(localStorage.getItem("todos")) || [];
    setPersistedTasks(storedTasks);
  }, []);

  useEffect(() => {

    // console.log(tasks)
    // console.log(persisted_tasks)
    // localStorage.removeItem('todos')
    if (!persistedTasks) return;

    const updatedTasks = persistedTasks.map(item => ({
      text: item.text,
      completed: item.completed
    }));

    setTasks(updatedTasks);
      
    }, [persistedTasks])

  const addTask = () => {
    if (task.trim()) {
      if (editingIndex !== null) {
        const newTasks = [...tasks];
        newTasks[editingIndex].text = task;
        setTasks(newTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
      }
      setTask("");
    }
  };

  const onSave = () => {
    localStorage.setItem('todos', JSON.stringify(tasks))
  }

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditingIndex(index);
  };

  return (
    <div className="todo-container">
      <h2 className="heading" style={{alignSelf: "center", marginLeft:'0px'}}>Todos</h2>
      <h2 className="heading">Create Task</h2>
      <div className="input-section">
        <input
          className="input"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done..."
        />
        <button className="add-btn" onClick={addTask}>{editingIndex !== null ? "Update" : "Add"}</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index} className="list-item">
            <div className="in-el">
              <input type="checkbox" id="item" onClick={() => toggleTask(index)} />
              <label htmlFor="item" className={t.completed ? "completed" : "label-text"}>{t.text}</label>
            </div>
            <div>
              <button className="list-btns" onClick={() => editTask(index)}>Edit</button>
              <button className="list-btns" onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button className="list-btns" onClick={onSave}>Save</button>
    </div>
  );
};

export default TodoApp;
