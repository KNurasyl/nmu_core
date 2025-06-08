'use client'

import { LOGIN } from '@/graphql/auth'
import { useAuthStore } from '@/stores/auth.store'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Button, Col, Form, Input, Row, Spin } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import promo from '../../images/Login_promo.png'
import logo from '../../images/Logo.png'

interface IFieldValue {
	phoneNumber: string
	password: string
}

const AuthForm = () => {
	const [login, { loading }] = useMutation(LOGIN, {
		onCompleted(data) {
			setUser(data.login.user)
			setAccessToken(data.login.accessToken)
			router.replace('/')
		},
		onError() {
			toast.error('Ошибка авторизации')
		},
	})

	const router = useRouter()
	const { setUser, setAccessToken } = useAuthStore(state => state)

	const onFinish = async (values: IFieldValue) => {
		await login({
			variables: { input: values },
		})
	}

	return (
		<Spin spinning={loading}>
			<Row style={{ height: '100vh' }}>
				<Col
					style={{
						height: '100%',
						width: '50%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Row>
						<Image src={logo} alt='promo' width={200} height={200} priority />
					</Row>

					<Row>
						<Form
							name='login'
							initialValues={{ remember: true }}
							style={{ width: 400 }}
							onFinish={onFinish}
						>
							<Form.Item<IFieldValue>
								name='phoneNumber'
								rules={[{ required: true, message: 'Введите номер телефона!' }]}
							>
								<Input prefix={<UserOutlined />} placeholder='Номер телефона' />
							</Form.Item>
							<Form.Item<IFieldValue>
								name='password'
								rules={[{ required: true, message: 'Введите пароль!' }]}
							>
								<Input.Password
									prefix={<LockOutlined />}
									type='password'
									placeholder='Пароль'
								/>
							</Form.Item>

							<Form.Item>
								<Button block type='primary' htmlType='submit'>
									Войти
								</Button>
							</Form.Item>
						</Form>
					</Row>
				</Col>

				<Col style={{ height: '100%', width: '50%' }}>
					<Image
						src={promo}
						alt='promo'
						fill
						style={{ objectFit: 'cover' }}
						priority
					/>
				</Col>
			</Row>
		</Spin>
	)
}

export default AuthForm
