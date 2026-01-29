// Stats component shows task counts and filter options
const Stats = ({ tasks, filter, setFilter }) => {
  // Calculate task counts
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;

  // Hide stats if no tasks exist
  if (total === 0) return null;

  return (
    <div className="stats">
      {/* Task statistics */}
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total</span>
        </div>

        <div className="stat-item">
          <span className="stat-number active">{active}</span>
          <span className="stat-label">Active</span>
        </div>

        <div className="stat-item">
          <span className="stat-number completed">{completed}</span>
          <span className="stat-label">Done</span>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="filter-tabs">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>

        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>

        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Stats;
