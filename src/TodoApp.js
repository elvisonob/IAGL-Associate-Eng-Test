import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRequest } from './actions/index.js';

import TodoList from './component/TodoList.js';
import TodoText from './component/TodoText.js';
import './index.css';

const App = () => {
  const dispatchFn = useDispatch();

  useEffect(() => {
    dispatchFn(fetchRequest());
  }, [dispatchFn]);
  return (
    <Fragment>
      <TodoText />
      <TodoList />
    </Fragment>
  );
};

export default App;
