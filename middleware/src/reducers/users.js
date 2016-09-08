import {
  FETCH_USERS
} from '../actions/types';

export default function( state=[], action) {
  switch(action.type) {
    case FETCH_USERS:
      /* 断点测试 */
      //debugger;
      return [ ...state, ...action.payload.data ];
  }
  
  return state;
}