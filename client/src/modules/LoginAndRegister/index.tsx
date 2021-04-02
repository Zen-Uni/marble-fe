import { ComponentType } from 'react';
import { Typography } from 'antd';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
import { PathName } from 'routes';

import './index.less';

const { Title } = Typography;

const LoginAndRegister: ComponentType<RouteConfigComponentProps<any>> = ({
  route,
  history,
}) => {
  if (history.location.pathname === PathName.SIGN) {
    history.replace(PathName.LOGIN);
    return null;
  }
  return (
    <div className="Sign flex flex-column text-center non-select">
      <Typography>
        <Title className="text-primary Sign--Logo">Marble</Title>
      </Typography>
      {renderRoutes(route?.routes)}
    </div>
  );
};

export default LoginAndRegister;
