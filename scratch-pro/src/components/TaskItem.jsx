import { useState } from "react";

// TaskItem represents a single task
const TaskItem = ({ task, onToggle, onDelete }) => {
  // State for delete animation
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle task deletion with delay
  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete();
    }, 300);
  };

  return (
    <div
      className={`task-item ${
        task.completed ? "done" : ""
      } ${isDeleting ? "deleting" : ""}`}
    >
      {/* Task content */}
      <div className="task-content" onClick={onToggle}>
        <div className="task-checkbox">
          {task.completed ? "✓" : ""}
        </div>
        <span className="task-title">{task.title}</span>
      </div>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="delete-btn"
        disabled={isDeleting}
      >
        {isDeleting ? "🗑️" : "✕"}
      </button>
    </div>
  );
};

export default TaskItem;
