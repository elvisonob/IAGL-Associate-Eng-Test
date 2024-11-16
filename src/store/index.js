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
};

const uiOperations = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    onTextChange(state, action) {
      state.text = action.payload;
    },

    todoList(state, action) {
      state.todoContent = action.payload; // Replace the state with fetched todos
    },

    addTodo(state, action) {
      state.todoContent.push(action.payload); // Add new todo to state
    },

    removeTodo(state, action) {
      const id = action.payload;
      state.todoContent = state.todoContent.filter(
        (eachItem) => eachItem.id !== id
      );
    },
  },
});

export const fetchRequest = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:9091/api/todo/');

      if (!response.ok) {
        throw new Error('Could not load data');
      }

      const data = await response.json();
      return data;
    };
    try {
      const todoData = await fetchData();
      console.log('Fetched data:', todoData);

      dispatch(uiActions.todoList(todoData));
    } catch (error) {
      console.log(error);
    }
  };
};

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
        throw new Error('Could not add todo');
      }

      const data = await response.json();
      return data;
    };
    try {
      const newTodo = await addData();
      dispatch(uiActions.addTodo(newTodo)); // Add the newly created todo to Redux state
    } catch (error) {
      console.log(error);
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
