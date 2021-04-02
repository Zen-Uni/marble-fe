/**
 * Q: 为什么要创建这个文件？
 * A: 在 create-react-app中使用ant-design
 * #<https://ant.design/docs/react/use-with-create-react-app-cn>
 */
const CracoLessPlugin = require('craco-less');
/**
 * 定制主题
 * Ant Design 的样式变量
 * #<https://ant.design/docs/react/customize-theme-cn>
 *
 * 默认样式变量
 * #<https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less>
 *
 */

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
