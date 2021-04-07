import { Button, Col, Form, Input, Row, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { PathName } from 'routes';
import { Link } from 'react-router-dom';
import { Gender, GenderCN, User } from 'utils/request/user';
import './index.less';

const { Option } = Select;

interface RegisterFormProps {
  loading: boolean;
  captchaLoading: boolean;
  onFinish: (values: Partial<User>) => void;
  sendCaptcha: (user: Partial<User>) => Promise<void>;
}

const genderSelector = [
  {
    label: GenderCN.UNKNOWN,
    value: Gender.UNKNOWN,
  },
  {
    label: GenderCN.MALE,
    value: Gender.MALE,
  },
  {
    label: GenderCN.FEMALE,
    value: Gender.FEMALE,
  },
];

const CaptchaTimeout = 30; // 单位s

export const RegisterForm: FC<RegisterFormProps> = ({
  loading,
  captchaLoading,
  onFinish,
  sendCaptcha,
}) => {
  const [form] = Form.useForm();

  const [timer, setTimer] = useState(-1); // 计时器编号
  const [timerText, setTimerText] = useState('0 秒'); // 倒计时
  const handleCaptchaTimeout = () => {
    if (timer !== -1) return;
    const recur = (time: number) => {
      if (time === 0) {
        setTimer(-1);
        return;
      }
      setTimerText(`${time} 秒`);
      setTimer(
        (setTimeout(() => {
          setTimerText(`${time} 秒`);
          recur(time - 1);
        }, 1000) as unknown) as number,
      );
    };
    recur(CaptchaTimeout); // 初始化倒计时
  };

  useEffect(() => {
    return () => {
      // 销毁组件前清除计时器
      timer !== -1 && clearTimeout(timer);
    };
  }, [timer]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const onGenderChange = (value: Gender) => {
    form.setFieldsValue({
      gender: value,
    });
  };
  return (
    <Form
      className="Sign--register"
      form={form}
      name="register"
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
        name="userName"
        label="昵称"
        rules={[
          {
            required: true,
            message: '昵称不能为空',
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
      <Form.Item
        name="confirmPassword"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入密码确认',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('输入的密码不匹配'));
            },
          }),
        ]}
      >
        <Input.Password disabled={loading} />
      </Form.Item>
      <Form.Item name="gender" label="性别">
        <Select
          defaultValue={Gender.UNKNOWN}
          onChange={onGenderChange}
          disabled={loading}
        >
          {genderSelector.map(({ value, label }) => (
            <Option key={label} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '请输入合法的邮箱',
          },
          {
            required: true,
            message: '邮箱不能为空',
          },
        ]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item label="验证码">
        <Row gutter={8}>
          <Col span={13}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: '请输入邮箱验证码',
                },
              ]}
            >
              <Input disabled={loading} />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Button
              style={{ minWidth: '102px' }}
              loading={captchaLoading}
              disabled={timer !== -1}
              onClick={async () => {
                if (!form.getFieldValue('email')) {
                  form.validateFields(['email']);
                  form.scrollToField('email', {
                    behavior: 'smooth',
                  });
                } else {
                  await sendCaptcha(form.getFieldsValue());
                  handleCaptchaTimeout();
                }
              }}
            >
              {timer === -1 ? '发送验证码' : timerText}
            </Button>
          </Col>
        </Row>
      </Form.Item>
      <div className="Sign--register--action">
        <Link to={PathName.LOGIN} replace={true}>
          <Button type="link">返回登录</Button>
        </Link>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </div>
    </Form>
  );
};
