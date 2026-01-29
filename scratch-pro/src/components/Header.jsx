// Header component receives tasks as props
const Header = ({ tasks }) => {
  // Total number of tasks
  const totalTasks = tasks.length;

  // Count completed tasks
  const completedTasks = tasks.filter(t => t.completed).length;

  // Calculate progress percentage
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">Smart Task Manager</h1>
      </div>

      {/* Show task summary */}
      <p className="header-subtitle">
        {totalTasks === 0
          ? "No tasks yet. Add your first task!"
          : `${completedTasks}/${totalTasks} tasks completed`}
      </p>

      {/* Progress section */}
      <div className="progress-container">
        <div className="progress-info">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>

        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
