import { uiActions } from '../store/index';

export const fetchRequest = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:9091/api/todo/');
      if (!response.ok) {
        dispatch(
          uiActions.showNotification({
            title: 'Retrieving todo',
            message: 'Could not load todo',
            status: 'Error',
          })
        );
      }

      dispatch(
        uiActions.showNotification({
          title: 'Success',
          message: 'Todos loaded',
          status: 'success',
        })
      );

      const data = await response.json();
      return data;
    };
    try {
      const todoData = await fetchData();

      dispatch(uiActions.todoList(todoData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          title: 'Loading todo',
          message: 'Could not load todo',
          status: 'error',
        })
      );
    }
    setTimeout(() => {
      dispatch(uiActions.clearNotification());
    }, 3000);
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
    setTimeout(() => {
      dispatch(uiActions.clearNotification());
    }, 3000);
  };
};
