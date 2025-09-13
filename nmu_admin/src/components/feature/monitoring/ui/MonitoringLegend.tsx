const MonitoringLegend = () => (
	<div className='mb-2 flex items-center gap-4 text-xs text-gray-600'>
		<span className='inline-flex items-center gap-2'>
			<i className='inline-block h-3.5 w-3.5 rounded border border-red-300 bg-red-50' />
			Сервис остановлен
		</span>
		<span className='inline-flex items-center gap-2'>
			<i className='inline-block h-3.5 w-3.5 rounded border border-blue/40 bg-blue/5' />
			Заморожен
		</span>
	</div>
)
export default MonitoringLegend
