import { createStore } from 'redux';
import Reducer from '../Reducer/reducer';

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("persistentState", serializedState);
  } catch (e) {
    console.warn(e);
  }
}
// load string from localStorage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("persistentState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const rootReducer = (state, action) => {
  return Reducer(state, action);
};


const configureAppStore = () => {
  const store = createStore(rootReducer, loadFromLocalStorage());
  store.subscribe(() => saveToLocalStorage(store.getState()));
  return store;
};

export default configureAppStore;
