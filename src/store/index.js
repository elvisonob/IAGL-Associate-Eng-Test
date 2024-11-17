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
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const uiActions = uiOperations.actions;

const store = configureStore({
  reducer: {
    uiReducer: uiOperations.reducer,
  },
});

export default store;
