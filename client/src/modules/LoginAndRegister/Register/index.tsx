import { FC, useState } from 'react';
import { message, Typography } from 'antd';
import { RegisterForm } from './RegisterForm';
import { User } from 'utils/request/user';
import { Redirect } from 'react-router-dom';
import { user as request } from 'utils/request';
import { PathName } from 'routes';

const { Title } = Typography;
const Register: FC = () => {
  const [loading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  if (isRegistered) {
    message.success('注册成功，跳转到登陆页面');
    return <Redirect to={PathName.LOGIN} />;
  }
  const onFinish = async (user: Partial<User>) => {
    setLoading(true);
    const res = await request.register(user);
    setLoading(false);
    if (res?.code === 0) {
      setIsRegistered(true);
    }
  };

  const handleSendCaptcha = async (user: Partial<User>) => {
    setCaptchaLoading(true);
    const res = await request.sendCaptcha(user);
    setCaptchaLoading(false);
    if (res?.code === 0) {
      message.info(res.message);
    }
  };

  return (
    <div>
      <Typography>
        <Title level={2}>注册</Title>
      </Typography>
      <RegisterForm
        loading={loading}
        captchaLoading={captchaLoading}
        onFinish={onFinish}
        sendCaptcha={handleSendCaptcha}
      />
    </div>
  );
};

export default Register;
