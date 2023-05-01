import {
  Middleware, applyMiddleware, combineReducers, createStore
} from 'redux';
import repoReducer from './reducers/repoReducer';
import saveTodos from './middleware/saveTodos';

const rootReducer = combineReducers({
  repoReducer,
});
const store = createStore(
  rootReducer,
  applyMiddleware(saveTodos as unknown as Middleware)
);
export default store;
