'use client'

import { GET_COURSES } from '@/graphql/course'
import { GetCoursesQuery } from '@/graphql/generated/graphql'
import { CREATE_USER_COURSE_ACCESS } from '@/graphql/user'
import { useMutation, useQuery } from '@apollo/client'
import {
	Checkbox,
	DatePicker,
	Form,
	Input,
	Modal,
	Select,
	notification,
} from 'antd'

interface Props {
	open: boolean
	onClose: () => void
	userId: string
	refetch: () => void
}

interface IFormValues {
	courseId: string
	accessStartDate: string
	active: boolean
	comment?: string
}

const UserAddAccessCourseModal = ({
	open,
	onClose,
	userId,
	refetch,
}: Props) => {
	const [form] = Form.useForm()

	const { data } = useQuery<GetCoursesQuery>(GET_COURSES)

	const [createAccess, { loading }] = useMutation(CREATE_USER_COURSE_ACCESS, {
		onCompleted: () => {
			notification.success({
				message: 'Курс успешно назначен',
				placement: 'topRight',
			})
			form.resetFields()
			refetch()
			onClose()
		},
		onError: () => {
			notification.error({
				message: 'Ошибка при назначении курса',
				placement: 'topRight',
			})
		},
	})

	const handleSubmit = async () => {
		const values = await form.validateFields()
		await createAccess({
			variables: {
				input: {
					user: userId,
					course: values.courseId,
					accessStartDate: values.accessStartDate,
					active: values.active,
					comment: values.comment || '',
				},
			},
		})
	}

	const courseOptions =
		data?.getCourses?.map(course => ({
			value: course?._id,
			label: `${course?.courseName} / ${course?.lang}`,
		})) || []

	return (
		<Modal
			title='Назначить курс'
			open={open}
			onCancel={onClose}
			onOk={handleSubmit}
			okText='Сохранить'
			cancelText='Отмена'
			confirmLoading={loading}
		>
			<Form layout='vertical' form={form}>
				<Form.Item<IFormValues>
					name='courseId'
					label='Курс'
					rules={[{ required: true, message: 'Выберите курс' }]}
				>
					<Select options={courseOptions} placeholder='Выберите курс' />
				</Form.Item>

				<Form.Item<IFormValues>
					name='accessStartDate'
					label='Дата начала'
					rules={[{ required: true }]}
				>
					<DatePicker style={{ width: '100%' }} />
				</Form.Item>

				<Form.Item<IFormValues> name='active' valuePropName='checked'>
					<Checkbox>Активен</Checkbox>
				</Form.Item>

				<Form.Item<IFormValues> name='comment' label='Комментарий'>
					<Input.TextArea rows={3} placeholder='Комментарий (необязательно)' />
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default UserAddAccessCourseModal
