/**
 * @description 集中管理路由
 * @author Uni
 */

import Main from './modules/Main';
import Admin from './modules/Admin';
import Project from './modules/Project';
import Test from 'modules/test';

export enum PathName {
  MAIN = '/main',
  PROJECT = '/main/project',
  SIGN = '/sign',
  LOGIN = '/sign/login',
  REGISTER = '/sign/register',
  ADMIN = '/sign/admin',
  TEST = '/test',
}
const routes = [
  // 主页路由
  {
    path: PathName.MAIN,
    component: Main,
    routes: [
      {
        path: PathName.PROJECT,
        exact: true,
        component: Project,
      },
    ],
  },
  {
    path: PathName.ADMIN,
    exact: true,
    component: Admin,
  },
  // 测试数据用的路由
  {
    path: PathName.TEST,
    exact: true,
    component: Test,
  },
];

export default routes;
