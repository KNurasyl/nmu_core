import TaskPage from '@/features/task/TaskPage'

const Page = async ({ params }: { params: Promise<{ taskId: string }> }) => {
	const { taskId } = await params

	return <TaskPage taskId={taskId} />
}

export default Page
