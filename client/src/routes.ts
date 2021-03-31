/**
 * @description 集中管理路由
 * @author Uni
 */

import LoginAndRegister from './modules/LoginAndRegister';
import Main from './modules/Main';
import Admin from './modules/Admin';
import Project from './modules/Project';

const routes = [
  // 主页路由
  {
    path: '/main',
    component: Main,
    routes: [
      {
        path: '/main/project',
        exact: true,
        component: Project,
      },
    ],
  },
  // 登陆注册页面的路由
  {
    path: '/sign',
    exact: true,
    component: LoginAndRegister,
  },
  {
    path: '/admin',
    exact: true,
    component: Admin,
  },
];

export default routes;
