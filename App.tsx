import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
import MainStack from './src/navigation';
const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;
