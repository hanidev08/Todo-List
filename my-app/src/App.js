import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { TodosContext } from "./context/todosContext";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import MySnackBar from "./components/MySnackBar";
import { ToastContext } from "./context/ToastContext";
import ToastProvider from "./context/ToastContext";
import TodosProvider from "./context/todosContext";

const theme = createTheme({
  typography: {
    fontFamily: ["SpaceMono"],
  },

  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "Edit Video",
    details: "edit video react",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Edit Logo",
    details: "edit video react",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#191b1f",
              height: "100vh",
            }}
          >
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
