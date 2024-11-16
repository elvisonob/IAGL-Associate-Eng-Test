import { uiActions } from '../store/index';

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
