import React from 'react';
import TabNavigator from './src/navigation/TabNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
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
