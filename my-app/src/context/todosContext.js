import { createContext, useContext, useReducer } from "react";
import todosReducer from "../reducers/todosReducer";
export const TodosContext = createContext([]);
export const DispachContext = createContext(null);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={{ todos }}>
      <DispachContext.Provider value={{ dispatch }}>
        {children}
      </DispachContext.Provider>
    </TodosContext.Provider>
  );
};

export default TodosProvider;

export const useTodos = () => {
  return useContext(TodosContext);
};

export const useTodosDispatch = () => {
  return useContext(DispachContext);
};
