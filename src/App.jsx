import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [newTask, setNewTask] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    if (!newTask.trim()) return

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    }

    setTasks([...tasks, task])
    setNewTask("")
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <div className="app">
      <h1>My Task Manager</h1>
      <p>Organize your day, one task at a time.</p>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask()
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "selected" : ""}
          onClick={() => setFilter("all")}>
          All
        </button>

        <button
          className={filter === "active" ? "selected" : ""}
          onClick={() => setFilter("active")}>
          Active
        </button>

        <button
          className={filter === "completed" ? "selected" : ""}
          onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div className="task" key={task.id}>
            <span
              onClick={() => toggleTask(task.id)}
              className={task.completed ? "completed" : ""}>
              {task.completed ? "✓ " : "○ "}
              {task.title}
            </span>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}

        {filteredTasks.length === 0 && <p className="empty">No tasks found.</p>}
      </div>

      <div className="stats">
        <p>Total tasks: {tasks.length}</p>
        <p>Completed: {completedCount}</p>
        <p>Remaining: {tasks.length - completedCount}</p>
      </div>
    </div>
  )
}

export default App
