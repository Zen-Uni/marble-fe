/**
 * @description 测试 reducer
 * @author Uni
 */

import ActionTypes from '../action/types';

export interface DefaultState {
  username: string;
}

interface Action {
  type: string;
  value: any;
}

const defaultState: DefaultState = {
  username: 'Uni',
};

function reducer(
  state: DefaultState = defaultState,
  action: Action,
): DefaultState {
  if (action.type === ActionTypes.changeName) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.username = action.value;
    return newState;
  }

  return state;
}

export default reducer;
