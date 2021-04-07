import { FC } from 'react';
import { connect } from 'react-redux';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import { PathName } from 'routes';

const propsToState = (state: any) => {
  return {
    isLogin: state.common.isLogin,
  };
};

const propsToDispatch = (dispatch: any) => {
  return {};
};

type MainProps = ReturnType<typeof propsToState> &
  ReturnType<typeof propsToDispatch>;

const Main: FC<RouteConfigComponentProps<any> & MainProps> = ({
  route,
  isLogin,
}) => {
  if (!isLogin) {
    return <Redirect to={PathName.LOGIN}></Redirect>;
  }

  return (
    <div>
      <div>this is main page</div>
      {renderRoutes(route?.routes)}
    </div>
  );
};

export default connect(propsToState, propsToDispatch)(Main);
