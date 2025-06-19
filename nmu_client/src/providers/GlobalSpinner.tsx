'use client'

import { useLoadingStore } from '@/stores/load.store'
import Image from 'next/image'
import image from './../assets/images/spinner.png'

const GlobalSpinner = ({ children }: { children: React.ReactNode }) => {
	const load = useLoadingStore(state => state.isLoading)

	return (
		<>
			{load && (
				<div className='spinner-overlay'>
					<div className='spinner-img-wrapper'>
						<Image
							src={image}
							alt='spinner'
							fill
							style={{ objectFit: 'contain' }}
							priority
							sizes='96px'
						/>
					</div>
				</div>
			)}
			{children}
		</>
	)
}

export default GlobalSpinner
