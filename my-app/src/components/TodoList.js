import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useContext, useMemo, useReducer } from "react";

import {
  TodosContext,
  useTodos,
  useTodosDispatch,
} from "../context/todosContext";
import { ToastContext, useToast } from "../context/ToastContext";

export default function TodoList() {
  const { todos } = useTodos();
  const { dispatch } = useTodosDispatch();

  const [titleInput, setTitleInput] = useState("");

  const { showHideToast } = useToast();
  const [showDelteDialog, setShowDelteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const [dialogTodo, setDialogTodo] = useState(false);

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const completedTodos = useMemo(() => {
    console.log("complet");
    return todos.filter((t) => t.isCompleted);
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    console.log("non-complet");
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }
  function handleAddClick() {
    dispatch({ type: "added", payload: { newTitle: titleInput } });
    showHideToast("Added successfully");
    setTitleInput("");
  }

  // Handler

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDelteDialog(true);
  }
  function handleDeleteClose() {
    setShowDelteDialog(false);
  }

  function handleDeleteConfirme() {
    dispatch({ type: "deleted", payload: dialogTodo });
    setShowDelteDialog(false);
    showHideToast("Deleted successfully");
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirme() {
    dispatch({ type: "updated", payload: dialogTodo });
    setShowUpdateDialog(false);
    showHideToast("Updated successfully");
  }

  const todoJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });
  return (
    <>
      <Dialog
        open={showDelteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete the task?{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo the deletion after it is complete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Close</Button>
          <Button onClick={handleDeleteConfirme} autoFocus>
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Modify the task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task title"
            type="email"
            fullWidth
            variant="standard"
            value={dialogTodo?.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="the details"
            type="email"
            fullWidth
            variant="standard"
            value={dialogTodo?.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Close</Button>
          <Button onClick={handleUpdateConfirme} autoFocus>
            to be sure
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography
              variant="h4"
              style={{
                display: "flex",
                justifyContent: "start",
                fontWeight: "bold",
              }}
            >
              To Do List
            </Typography>
            <Divider />
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid xs={8}>
                {" "}
                <TextField
                  style={{ width: "100%" }}
                  id="standard-basic"
                  label="Task title"
                  variant="standard"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4}>
                {" "}
                <Button
                  style={{ width: "100%", height: "100%" }}
                  variant="outlined"
                  onClick={handleAddClick}
                  disabled={titleInput == 0}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            <ToggleButtonGroup
              style={{ marginTop: "10px" }}
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              color="primary"
            >
              <ToggleButton value="all">All </ToggleButton>
              <ToggleButton value="completed">Completed </ToggleButton>
              <ToggleButton value="non-completed">not Completed </ToggleButton>
            </ToggleButtonGroup>

            {todoJsx}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
