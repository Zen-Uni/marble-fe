import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PathName } from 'routes';
import { User } from 'utils/request/user';
import './index.less';

interface LoginFormProps {
  loading: boolean;
  onFinish: (values: Partial<User>) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ loading, onFinish }) => {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  return (
    <Form
      className="Sign--login"
      form={form}
      name="login"
      {...formItemLayout}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="userAccount"
        label="账号"
        rules={[
          {
            required: true,
            message: '账号不能为空',
          },
        ]}
      >
        <Input disabled={loading} />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '密码不能为空',
          },
        ]}
        hasFeedback
      >
        <Input.Password disabled={loading} />
      </Form.Item>
      <div className="Sign--login--action">
        <Link to={PathName.REGISTER} replace={true}>
          <Button type="link">前往注册</Button>
        </Link>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </div>
    </Form>
  );
};
