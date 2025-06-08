import { LockOutlined, UserOutlined } from '@ant-design/icons'
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Row,
	Space,
	Spin,
	Typography,
} from 'antd'
import Image from 'next/image'
import promo from '../../assets/images/Login_promo.png'
import logo from '../../assets/images/main_logo.svg'

export interface ILoginFieldValues {
	phoneNumber: string
	password: string
}

interface IProps {
	title: string
	subtitle: string
	reqPhoneMsg: string
	reqPassMsg: string
	phonePlaceholder: string
	passPlaceholder: string
	submitText: string
	loading: boolean
	onFinish: (values: ILoginFieldValues) => void
}

export const LoginForm = ({
	title,
	subtitle,
	reqPhoneMsg,
	reqPassMsg,
	passPlaceholder,
	phonePlaceholder,
	submitText,
	loading,
	onFinish,
}: IProps) => {
	return (
		<Spin spinning={loading}>
			<Row className='login_form'>
				<Col
					xs={24}
					sm={24}
					md={24}
					lg={24}
					xl={12}
					className='login_form__col_form'
				>
					<Card className='login_form__card'>
						<Space direction='vertical' align='center'>
							<Image src={logo} alt={'logo'} height={100} width={100} />
							<Typography className='login_form__card__title'>
								{title}
							</Typography>
							<Typography className='login_form__card__subtitle'>
								{subtitle}
							</Typography>
						</Space>

						<Form
							name='login'
							className='form'
							initialValues={{ remember: true }}
							onFinish={onFinish}
						>
							<Form.Item<ILoginFieldValues>
								name='phoneNumber'
								rules={[{ required: true, message: reqPhoneMsg }]}
							>
								<Input
									prefix={<UserOutlined className='input_icon' />}
									placeholder={phonePlaceholder}
								/>
							</Form.Item>
							<Form.Item<ILoginFieldValues>
								name='password'
								rules={[{ required: true, message: reqPassMsg }]}
							>
								<Input.Password
									prefix={<LockOutlined className='input_icon' />}
									type='password'
									placeholder={passPlaceholder}
								/>
							</Form.Item>
							<Form.Item>
								<Button
									className='form__submitBtn'
									block
									type='primary'
									htmlType='submit'
									loading={loading}
								>
									{submitText}
								</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
				<Col xs={0} sm={0} md={0} lg={12} xl={12} className='promo_col'>
					<div className='promo_img_wrapper'>
						<Image
							src={promo}
							alt='promo'
							fill
							style={{ objectFit: 'cover' }}
							priority
						/>
					</div>
				</Col>
			</Row>
		</Spin>
	)
}
