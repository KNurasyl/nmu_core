import { MainLayout } from '@/components/layouts/MainLayout'

const Layout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return <MainLayout>{children}</MainLayout>
}

export default Layout
