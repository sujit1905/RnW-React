import React, { useEffect, useReducer, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Stats from "./components/Stats";
import { taskReducer, initialState } from "./hooks/useTasksReducer";

const App = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [filter, setFilter] = useState('all');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
      const storedTasks = localStorage.getItem("smart-task-manager-tasks");
      const storedFilter = localStorage.getItem("smart-task-manager-filter");
      
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          dispatch({ type: "LOAD_TASKS", payload: parsedTasks });
        }
      }
      
      if (storedFilter && ['all', 'active', 'completed'].includes(storedFilter)) {
        setFilter(storedFilter);
      }
      
      setIsInitialized(true);
    
  }, []);

  // Save to localStorage whenever tasks or filter change
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      localStorage.setItem("smart-task-manager-tasks", JSON.stringify(state.tasks));
      localStorage.setItem("smart-task-manager-filter", filter);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      if (error.name === 'QuotaExceededError') {
        alert("Storage is full. Some tasks may not be saved.");
      }
    }
  }, [state.tasks, filter, isInitialized]);


  // Function to add task using dispatch
  const handleAddTask = (newTask) => {
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const filteredTasks = state.tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="container">
        <Header 
          tasks={state.tasks} 
        />
        <TaskForm onAddTask={handleAddTask} />
        <Stats tasks={state.tasks} filter={filter} setFilter={setFilter} />
        <TaskList tasks={filteredTasks} dispatch={dispatch} />
        
        {isInitialized && (
          <div className="storage-status">
            <small>
              {state.tasks.length > 0 
                ? `Tasks saved locally (${state.tasks.length} total)` 
                : "No tasks saved yet"}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;