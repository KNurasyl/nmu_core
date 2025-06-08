import Layout, { Content, Header } from 'antd/es/layout/layout'
import { ReactNode } from 'react'
import { HeaderPagination } from './ui/HeaderPagination'
import FooterPagination from './ui/FooterPagination'

interface IProps {
	children: ReactNode
}

export const MainLayout = ({ children }: IProps) => {
	return (
		<Layout className='main_layout'>
			<Header className='header_desktop'>
				<HeaderPagination />
			</Header>

			<Content className='main_content'>{children}</Content>

      <FooterPagination/>
		</Layout>
	)
}
