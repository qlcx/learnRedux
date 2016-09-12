import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
//import { reducer } from 'redux-form';

const rootReducer = combineReducers({
  form, // => form: form 
  //form: reducer
});

export default rootReducer;
