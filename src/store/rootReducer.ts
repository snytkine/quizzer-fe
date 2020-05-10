import { combineReducers } from 'redux';
import { counterReducer } from './counterReducer';
import { reducer as formReducer } from 'redux-form';


export const rootReducer = combineReducers({
  counter: counterReducer,
  form: formReducer,
});
