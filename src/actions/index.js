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
  };
};
