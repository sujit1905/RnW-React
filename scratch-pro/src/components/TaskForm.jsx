import { useState } from "react";

// TaskForm handles adding new tasks
const TaskForm = ({ onAddTask }) => {
  // State for input value
  const [task, setTask] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent empty task submission
    if (!task.trim()) return;

    // Add new task if function exists
    if (onAddTask && typeof onAddTask === "function") {
      onAddTask({
        id: Date.now(),
        title: task.trim(),
        completed: false,
      });
    } else {
      console.error("onAddTask is not a function!");
    }

    // Clear input after submit
    setTask("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done today?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          autoFocus
        />
      </div>

      {/* Submit button */}
      <button type="submit" className="add-btn">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
