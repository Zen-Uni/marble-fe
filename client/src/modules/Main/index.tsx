import React from 'react';
import { renderRoutes } from 'react-router-config';

function Main(props: any) {
  return (
    <div>
      <div>this is main page</div>
      {renderRoutes(props.route.routes)}
    </div>
  );
}

export default Main;
