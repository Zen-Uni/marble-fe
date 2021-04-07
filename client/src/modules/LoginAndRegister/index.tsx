import { FC } from 'react';
import { Typography } from 'antd';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { PathName } from 'routes';

import './index.less';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const { Title } = Typography;

const propsToState = (state: any) => {
  return {
    isLogin: state.common.isLogin,
  };
};

const propsToDispatch = (dispatch: any) => {
  return {};
};

type LoginAndRegisterProps = ReturnType<typeof propsToState> &
  ReturnType<typeof propsToDispatch>;

const LoginAndRegister: FC<
  RouteConfigComponentProps<any> & LoginAndRegisterProps
> = ({ route, history, isLogin }) => {
  if (isLogin) {
    return <Redirect to={PathName.MAIN}></Redirect>;
  }

  if (history.location.pathname === PathName.SIGN) {
    return <Redirect to={PathName.LOGIN}></Redirect>;
  }
  return (
    <div className="Sign flex flex-column text-center non-select">
      <Typography>
        <Title className="Sign--Logo">Marble</Title>
      </Typography>
      {renderRoutes(route?.routes)}
    </div>
  );
};

export default connect(propsToState, propsToDispatch)(LoginAndRegister);
