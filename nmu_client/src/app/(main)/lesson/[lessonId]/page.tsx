import LessonPage from '@/features/lesson/LessonPage'

const Page = async ({ params }: { params: Promise<{ lessonId: string }> }) => {
	const { lessonId } = await params

	return <LessonPage lessonId={lessonId} />
}

export default Page
