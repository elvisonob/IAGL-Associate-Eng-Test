import { useDispatch, useSelector } from 'react-redux';
import { addTodoRequest } from './../actions/index.js';
import { uiActions } from './../store/index.js';

const TodoText = (props) => {
  const todoText = useSelector((state) => state.uiReducer.text);

  const dispatchFn = useDispatch();

  const onHandleChange = (e) => {
    dispatchFn(uiActions.onTextChange(e.target.value));
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!todoText.trim()) {
      alert('Please type a Todo');
      return;
    }
    dispatchFn(addTodoRequest(todoText));
    dispatchFn(uiActions.onTextChange(''));
  };

  return (
    <div className="todo-container">
      <h1>TODO APP</h1>
      <form onSubmit={onHandleSubmit}>
        <label htmlFor="text">Add a Todo</label>
        <input
          id="text"
          type="text"
          name="text"
          onChange={onHandleChange}
          value={todoText}
        />
        <button>Enter</button>
      </form>
    </div>
  );
};

export default TodoText;
