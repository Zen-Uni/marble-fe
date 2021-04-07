import { FC, useState } from 'react';
import { connect } from 'react-redux';
import { setUserInfo, setToken, logIn } from 'store/action/index';
import { User } from 'utils/request/user';
import { user as request } from 'utils/request';
import { RouteComponentProps } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { message as Message, Typography } from 'antd';
import { isDef } from 'utils/tools';

const { Title } = Typography;
const propsToState = (state: any) => {
  return {};
};

const propsToDispatch = (dispatch: any) => {
  return {
    setUserInfo(user: Partial<User>) {
      const action = setUserInfo(user);
      dispatch(action);
    },
    setToken(token: string) {
      const action = setToken(token);
      dispatch(action);
    },
    logIn() {
      const action = logIn();
      dispatch(action);
    },
  };
};

type LoginProps = ReturnType<typeof propsToState> &
  ReturnType<typeof propsToDispatch> &
  RouteComponentProps;

const Login: FC<LoginProps> = ({ setUserInfo, setToken, logIn }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (user: Partial<User>) => {
    setLoading(true);
    const res = await request.login(user);
    setLoading(false);
    if (isDef(res)) {
      const { code, message, data } = res;
      if (!code && isDef(data)) {
        Message.success(message);
        setUserInfo(data);
        setToken(data.token);
        logIn();
      }
    }
  };

  return (
    <div>
      <Typography>
        <Title level={2}>登录</Title>
      </Typography>
      <LoginForm loading={loading} onFinish={onFinish} />
    </div>
  );
};

export default connect(propsToState, propsToDispatch)(Login);
