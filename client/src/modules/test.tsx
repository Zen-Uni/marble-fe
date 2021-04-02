import { connect } from 'react-redux';

import { changeNameAction } from 'store/action/index';

function Test(props: any) {
  const { username, changeUserName } = props;

  const handleChangeName = (e: any) => {
    changeUserName(e.target.value);
  };

  return (
    <>
      <input type="text" onChange={handleChangeName} />
      <div>从 redux 中来的数据：{username}</div>
    </>
  );
}

const propsToState = (state: any) => {
  return {
    username: state.test.username,
  };
};

const propsToDispatch = (dispatch: any) => {
  return {
    changeUserName(name: string) {
      const action = changeNameAction(name);
      dispatch(action);
    },
  };
};

export default connect(propsToState, propsToDispatch)(Test);
