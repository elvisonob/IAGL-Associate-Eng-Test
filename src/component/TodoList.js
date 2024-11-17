import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './../store/index.js';

const TodoList = () => {
  const todoList = useSelector((state) => state.uiReducer.todoContent);
  const dispatchFn = useDispatch();
  //if no todoItem, update it 'No todo added yet'
  return (
    <div className="displayList">
      <h2>List of Added Todos</h2>
      {todoList.length === 0 ? (
        <p className="no-todos">No todo added yet</p>
      ) : (
        <ul>
          {todoList.map((eachItem) => (
            <div className="displayList2" key={eachItem.id}>
              <li>{eachItem.todo}</li>
              <button
                onClick={() => dispatchFn(uiActions.removeTodo(eachItem.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
