import { Action } from 'redux';
import { ActionType } from './actiontypes';

export function counterReducer(state: number = 0, action: Action): number {

  switch (action.type) {
    case ActionType.INCREMENT_COUNTER:
      return state + 1;

    case ActionType.DECREMENT_COUNTER:
      return state - 1;

    default:
      return state;

  }
}
