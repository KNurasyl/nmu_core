'use client'

import { REGISTER } from '@/graphql/auth'
import { UserRole } from '@/types/enums'
import { useMutation } from '@apollo/client'
import { Form, Input, Modal, notification, Select } from 'antd'

interface IProps {
	open: boolean
	onClose: () => void
	refetch: () => void
}

interface IFormValues {
	password: string
	phoneNumber: string
	userName: boolean
	userRole: UserRole
}

const UserAddModal = ({ open, onClose, refetch }: IProps) => {
	const [form] = Form.useForm()

	const [register, { loading }] = useMutation(REGISTER, {
		onCompleted: () => {
			notification.success({
				message: 'Пользователь успешно добавлен',
				placement: 'topRight',
			})
			form.resetFields()
			refetch()
			onClose()
		},
		onError: () => {
			notification.error({
				message: 'Ошибка при добавлений пользователя',
				placement: 'topRight',
			})
		},
	})

	const handleSubmit = async () => {
		const values = await form.validateFields()
		await register({
			variables: {
				input: {
					password: values.password,
					phoneNumber: values.phoneNumber,
					userName: values.userName,
					userRole: values.userRole,
				},
			},
		})
	}

	const roleOptions = [
		{
			value: UserRole.Admin,
			label: 'Админ',
		},
		{
			value: UserRole.Student,
			label: 'Студент',
		},
	]

	return (
		<Modal
			title='Добавить пользователя'
			open={open}
			onCancel={onClose}
			onOk={handleSubmit}
			okText='Сохранить'
			cancelText='Отмена'
			confirmLoading={loading}
		>
			<Form layout='vertical' form={form}>
				<Form.Item<IFormValues>
					name='userName'
					label='Имя'
					rules={[{ required: true, message: 'Введите имя пользователя' }]}
				>
					<Input placeholder='Имя пользователя' />
				</Form.Item>
				<Form.Item<IFormValues>
					name='phoneNumber'
					label='Номер'
					rules={[{ required: true, message: 'Введите номер телефона' }]}
				>
					<Input placeholder='Номер телефона' />
				</Form.Item>
				<Form.Item<IFormValues>
					name='userRole'
					label='Роль'
					rules={[{ required: true, message: 'Выберите роль' }]}
				>
					<Select options={roleOptions} placeholder='Выберите роль' />
				</Form.Item>
				<Form.Item<IFormValues>
					name='password'
					label='Пароль'
					rules={[{ required: true, message: 'Введите номер пароль' }]}
				>
					<Input.Password placeholder='Пароль' />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default UserAddModal
