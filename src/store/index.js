import { createStore, applyMiddleware, compose } from 'redux';

import { configureStore, createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

//Debugging purposes
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store2 = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const initialState = {
  text: '',
  todoContent: [],
  notification: null,
};

const uiOperations = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    onTextChange(state, action) {
      state.text = action.payload;
    },

    todoList(state, action) {
      state.todoContent = action.payload;
    },

    addTodo(state, action) {
      state.todoContent.push(action.payload);
    },

    removeTodo(state, action) {
      const id = action.payload;
      state.todoContent = state.todoContent.filter(
        (eachItem) => eachItem.id !== id
      );
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const addTodoRequest = (todoText) => {
  return async (dispatch) => {
    const addData = async () => {
      const response = await fetch('http://localhost:9091/api/todo/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: todoText }),
      });

      if (!response.ok) {
        dispatch(
          uiActions.showNotification({
            title: 'Sending todo',
            message: 'Could not send todo',
            status: 'error',
          })
        );
      }

      dispatch(
        uiActions.showNotification({
          title: 'success',
          message: 'Todo added',
          status: 'success',
        })
      );

      const data = await response.json();
      return data;
    };
    try {
      const newTodo = await addData();
      dispatch(uiActions.addTodo(newTodo));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: 'Sending todo',
          message: 'Could not add todo',
          status: 'error',
        })
      );
    }
  };
};

export const uiActions = uiOperations.actions;

const store = configureStore({
  reducer: {
    uiReducer: uiOperations.reducer,
  },
});

export default store;
