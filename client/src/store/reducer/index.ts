/**
 * @description 分层管理 reducer
 * @author Uni
 */

import { combineReducers } from 'redux';

// 引入 sub reducer
import test from './test';
import common from './common';

const reducer = combineReducers({
  test,
  common,
});

export default reducer;
