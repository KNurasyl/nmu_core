'use client'

import { Eye, EyeOff } from 'lucide-react'
import { InputHTMLAttributes, ReactNode, useState } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label: string
	icon?: ReactNode
}

export const Input = ({ label, icon, type = 'text', ...props }: Props) => {
	const [showPassword, setShowPassword] = useState(false)

	const isPassword = type === 'password'
	const inputType = isPassword && showPassword ? 'text' : type

	return (
		<div className='flex flex-col space-y-1'>
			<label className='text-sm font-medium text-gray-700'>{label}</label>
			<div className='relative'>
				{icon && (
					<span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'>
						{icon}
					</span>
				)}

				<input
					{...props}
					type={inputType}
					className={`w-full rounded-xl border border-border px-3 py-2 text-gray-700 ${
						icon ? 'pl-10' : ''
					} pr-10 focus:outline-none focus:ring-2 focus:ring-emerald`}
				/>

				{isPassword && (
					<button
						type='button'
						onClick={() => setShowPassword(prev => !prev)}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald transition'
					>
						{showPassword ? (
							<EyeOff className='h-5 w-5' />
						) : (
							<Eye className='h-5 w-5' />
						)}
					</button>
				)}
			</div>
		</div>
	)
}
