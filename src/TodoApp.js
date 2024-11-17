import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequest } from './actions/index.js';

import TodoList from './component/TodoList.js';
import TodoText from './component/TodoText.js';
import Notification from './UI/Notification.js';
import './index.css';

const App = () => {
  const dispatchFn = useDispatch();
  const notification = useSelector((state) => state.uiReducer.notification);

  useEffect(() => {
    dispatchFn(fetchRequest());
  }, [dispatchFn]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
      <TodoText />
      <TodoList />
    </Fragment>
  );
};

export default App;
