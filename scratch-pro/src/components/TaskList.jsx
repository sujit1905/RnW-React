import TaskItem from "./TaskItem";

// TaskList displays all tasks
const TaskList = ({ tasks, dispatch }) => {
  // Show empty state when no tasks exist
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks yet</h3>
        <p>Add your first task to get started!</p>
      </div>
    );
  }

  // Toggle task completion
  const handleToggle = (taskId) => {
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  };

  // Delete a task
  const handleDelete = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-wrapper">
          <TaskItem
            task={task}
            onToggle={() => handleToggle(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
