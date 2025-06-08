'use client'

import { UPDATE_USER_PASSWORD } from '@/graphql/user'
import { useMutation } from '@apollo/client'
import { Form, Input, Modal } from 'antd'
import { toast } from 'react-toastify'

interface Props {
	open: boolean
	onClose: () => void
	userId: string
}

interface IFieldValue {
	newPassword: string
	oldPassword: string
}

const UserPasswordModal = ({ open, onClose, userId }: Props) => {
	const [form] = Form.useForm()
	const [updatePassword, { loading }] = useMutation(UPDATE_USER_PASSWORD, {
		onCompleted() {
			toast.success('Пароль успешно обновлён')
		},
		onError() {
			toast.error('Ошибка при обновлении пароля')
		},
	})

	const handleSubmit = async () => {
		const { oldPassword, newPassword } = await form.validateFields()

		await updatePassword({
			variables: {
				input: {
					userId,
					oldPassword,
					newPassword,
				},
			},
		})

		form.resetFields()
		onClose()
	}

	return (
		<Modal
			title='Сменить пароль'
			open={open}
			onCancel={onClose}
			onOk={handleSubmit}
			confirmLoading={loading}
			okText='Сохранить'
			cancelText='Отмена'
		>
			<Form layout='vertical' form={form}>
				<Form.Item<IFieldValue>
					label='Старый пароль'
					name='oldPassword'
					rules={[{ required: true, message: 'Введите старый пароль' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item<IFieldValue>
					label='Новый пароль'
					name='newPassword'
					rules={[{ required: true, message: 'Введите новый пароль' }]}
				>
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default UserPasswordModal
