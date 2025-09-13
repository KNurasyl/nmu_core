import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, ...props }: Props) => {
	return (
		<button
			{...props}
			className='w-full rounded-xl bg-emerald px-4 py-3 text-white font-medium shadow hover:opacity-90 transition disabled:opacity-60 cursor-pointer'
		>
			{children}
		</button>
	)
}
