import { ComponentType, useState } from 'react';
import { Typography } from 'antd';
import { RouteConfigComponentProps } from 'react-router-config';
import { RegisterForm } from './RegisterForm';
import { User } from 'utils/request/user';
// import { PathName } from 'routes';
const { Title } = Typography;

const Register: ComponentType<RouteConfigComponentProps<any>> = ({
  history,
}) => {
  const [loading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);

  // TODO: 调用注册接口 & 发送验证码接口
  const onFinish = (user: Partial<User>) => {
    setLoading(true);
    console.log(user);
    // TODO: 弹出注册成功窗口，并且在回调内跳转到登录窗口
    // history.push(PathName.LOGIN)
  };
  const sendCaptcha = async () => {
    setCaptchaLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 1000);
    });
    setCaptchaLoading(false);
  };
  return (
    <div>
      <Typography>
        <Title>注册</Title>
      </Typography>
      <RegisterForm
        loading={loading}
        captchaLoading={captchaLoading}
        onFinish={onFinish}
        sendCaptcha={sendCaptcha}
      />
    </div>
  );
};

export default Register;
