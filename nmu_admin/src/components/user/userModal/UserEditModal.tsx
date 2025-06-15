'use client'

import { User } from '@/graphql/generated/graphql'
import { UPDATE_USER_BY_ID } from '@/graphql/user'
import { UserRole } from '@/types/enums'
import { useMutation } from '@apollo/client'
import { Form, Input, Modal, Select } from 'antd'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface IProps {
	open: boolean
	onClose: () => void
	user?: User
}

interface IFieldValue {
	phoneNumber: string
	userRole: string
	userName: string
	password: string
}

const UserEditModal = ({ open, onClose, user }: IProps) => {
	const [form] = Form.useForm()
	const [updateUser, { loading }] = useMutation(UPDATE_USER_BY_ID, {
		onCompleted() {
			toast.success('Пользователь обновлён')

			onClose()
		},
		onError() {
			toast.error('Ошибка при обновлении')
			onClose()
		},
	})

	useEffect(() => {
		if (user) {
			form.setFieldsValue({
				userName: user.userName,
				phoneNumber: user.phoneNumber,
				userRole: user.userRole,
			})
		}
	}, [user, form])

	const handleFinish = async (values: IFieldValue) => {
		if (!user?._id) {
			toast.error('Не удалось получить ID пользователя')
			return
		}

		await updateUser({
			variables: {
				input: {
					id: user?._id,
					userName: values.userName,
					phoneNumber: values.phoneNumber,
					userRole: values.userRole,
				},
			},
		})
	}

	return (
		<Modal
			title='Редактировать пользователя'
			open={open}
			onCancel={onClose}
			onOk={() => form.submit()}
			okText='Сохранить'
			confirmLoading={loading}
		>
			<Form form={form} layout='vertical' onFinish={handleFinish}>
				<Form.Item<IFieldValue>
					label='Имя пользователя'
					name='userName'
					rules={[{ required: true, message: 'Введите имя пользователя' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<IFieldValue>
					label='Телефон'
					name='phoneNumber'
					rules={[{ required: true, message: 'Введите номер телефона' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<IFieldValue>
					label='Роль'
					name='userRole'
					rules={[{ required: true, message: 'Выберите роль' }]}
				>
					<Select>
						<Select.Option value={UserRole.Admin}>Админ</Select.Option>
						<Select.Option value={UserRole.Developer}>
							Разработчик
						</Select.Option>
						<Select.Option value={UserRole.Student}>Студент</Select.Option>
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default UserEditModal
