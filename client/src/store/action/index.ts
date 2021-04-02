/**
 * @description action 管理
 * @author Uni
 */

// 引入 action 类型
import ActionTypes from './types';

// 更改名字 --- test
export function changeNameAction(name: string) {
  return {
    type: ActionTypes.changeName,
    value: name,
  };
}
