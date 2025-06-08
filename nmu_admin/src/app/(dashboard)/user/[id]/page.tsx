import UserProfile from '@/components/user/UserProfile'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params

	return <UserProfile userId={id} />
}

export default Page
