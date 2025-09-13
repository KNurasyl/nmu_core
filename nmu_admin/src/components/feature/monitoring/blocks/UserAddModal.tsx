'use client'

import { REGISTER } from '@/graphql/auth'
import { useAuthStore } from '@/stores/auth.store'
import { UserRole } from '@/types/enums'
import { useMutation } from '@apollo/client'
import { Form, Input, Modal, Select } from 'antd'
import { toast } from 'react-toastify'

interface IProps {
	open: boolean
	onClose: () => void
	refetch: () => void
}

interface IFormValues {
	password: string
	phoneNumber: string
	userName: string // <-- было boolean, должно быть string
	userRole: UserRole
}

const UserAddModal = ({ open, onClose, refetch }: IProps) => {
	const [form] = Form.useForm<IFormValues>()
	const { user } = useAuthStore(state => state)

	const [register, { loading }] = useMutation(REGISTER, {
		onCompleted: () => {
			toast.success('Пользователь успешно добавлен')
			form.resetFields()
			refetch()
			onClose()
		},
		onError: error => {
			const msg =
				error?.graphQLErrors?.[0]?.message ||
				error?.message ||
				'Ошибка при добавлении пользователя'
			toast.error(msg)
		},
	})

	const handleSubmit = async () => {
		const values = await form.validateFields()
		await register({
			variables: {
				input: {
					password: values.password.trim(),
					phoneNumber: values.phoneNumber.replace(/\s+/g, ''), // нормализация как на бэке
					userName: values.userName,
					userRole: values.userRole,
					mentorId: user?._id,
				},
			},
		})
	}

	const roleOptions = [
		{ value: UserRole.Admin, label: 'Админ' },
		{ value: UserRole.Student, label: 'Студент' },
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
					rules={[{ required: true, message: 'Введите пароль' }]}
				>
					<Input.Password placeholder='Пароль' />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default UserAddModal
