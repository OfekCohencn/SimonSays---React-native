import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReducerU from './reducers';

const rootReducer = combineReducers({ ReducerU });

export const Store = createStore(rootReducer, applyMiddleware(thunk));