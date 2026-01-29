export const initialState = {
  tasks: [],
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return { tasks: action.payload };
    case "ADD_TASK":
      return {
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case "TOGGLE_TASK":
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
};