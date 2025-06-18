import { GET_LESSON_BY_ID } from '@/graphql/lesson'
import {
	USER_COURSE_PROGRESS_OPTIONAL,
	USER_LESSON_PROGRESS_OPTIONAL,
	USER_TASK_PROGRESS_OPTIONAL,
} from '@/graphql/progeress'
import { CREATE_USER_TASK_PROGRESS } from '@/graphql/task'
import { useMutation } from '@apollo/client'
import { Form, InputNumber, Modal, Switch } from 'antd'
import { toast } from 'react-toastify'

interface IProps {
	open: boolean
	onClose: () => void
	userId: string
	taskId: string
	lessonId: string
	courseId: string
	completed: boolean
}

interface IFieldValue {
	completed: string
	score: string
}

const UserTaskProgressModal = ({
	open,
	onClose,
	userId,
	taskId,
	lessonId,
	courseId,
	completed,
}: IProps) => {
	const [form] = Form.useForm()

	const [createUserTaskProgress, { loading }] = useMutation(
		CREATE_USER_TASK_PROGRESS,
		{
			onError() {
				toast.error('Ошибка')
			},
		}
	)

	const handleSubmit = async () => {
		const { score, completed } = await form.validateFields()

		await createUserTaskProgress({
			variables: {
				input: {
					completed: completed,
					completedAt: new Date(),
					courseId: courseId || '',
					lessonId: lessonId || '',
					score: score,
					taskId: taskId,
					userId: userId || '',
				},
			},
			refetchQueries: [
				{
					query: USER_COURSE_PROGRESS_OPTIONAL,
					variables: { userId },
				},
				{
					query: USER_LESSON_PROGRESS_OPTIONAL,
					variables: { userId },
				},
				{
					query: USER_TASK_PROGRESS_OPTIONAL,
					variables: { userId },
				},
				{
					query: GET_LESSON_BY_ID,
					variables: { id: lessonId },
				},
			],
			awaitRefetchQueries: true,
		})

		form.resetFields()
		onClose()
	}
	return (
		<Modal
			title='Изменить статус задание'
			open={open}
			onCancel={onClose}
			onOk={handleSubmit}
			confirmLoading={loading}
			okText='Сохранить'
			cancelText='Отмена'
		>
			<Form form={form} layout='vertical' initialValues={{ completed }}>
				<Form.Item<IFieldValue>
					label={<span style={{ fontWeight: 500 }}>Балл:</span>}
					name='score'
					rules={[{ required: true, message: 'Введите набранный балл' }]}
				>
					<InputNumber style={{ width: '100%' }} min={0} />
				</Form.Item>

				<Form.Item<IFieldValue>
					label={<span style={{ fontWeight: 500 }}>Статус:</span>}
					name='completed'
					valuePropName='checked'
				>
					<Switch
						checkedChildren='Выполнено'
						unCheckedChildren='Не выполнено'
					/>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default UserTaskProgressModal
