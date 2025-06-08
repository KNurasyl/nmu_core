import LessonList from '@/features/lesson/LessonList'

const Page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
	const { courseId } = await params

	return <LessonList courseId={courseId} />
}

export default Page
