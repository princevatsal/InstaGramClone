import { createStore } from 'redux';
import appReducer from './reducer';

const configureStore = () => {
return createStore(appReducer);
}
export default configureStore;