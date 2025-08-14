import { Button, Checkbox, Input, Row, Select, Space } from 'antd'

const { Option } = Select

type Setter<T> = (value: T) => void

interface IProps {
	search: string
	setSearch: Setter<string>
	idle: boolean
	setIdle: Setter<boolean>
	todayOnly: boolean
	setTodayOnly: Setter<boolean>
	statusFilter: string
	setStatusFilter: Setter<string>
	planFilter: string
	setPlanFilter: Setter<string>
	setAddUserOpen: Setter<boolean>
	setCourseFilter: Setter<string>
	courseFilter: string
	courseItems:
		| {
				label: string
				value: string
		  }[]
		| undefined
}

const MonitoringFilter = ({
	search,
	setSearch,
	idle,
	setIdle,
	todayOnly,
	setTodayOnly,
	statusFilter,
	setStatusFilter,
	planFilter,
	setPlanFilter,
	setAddUserOpen,
	setCourseFilter,
	courseFilter,
	courseItems,
}: IProps) => {
	return (
		<Row
			style={{ width: '100%', marginBottom: '15px' }}
			align='middle'
			justify='space-between'
		>
			<Space wrap>
				<Input
					placeholder='Поиск по телефону'
					allowClear
					style={{ width: 220 }}
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>

				<Select
					value={planFilter}
					onChange={setPlanFilter}
					style={{ width: 160 }}
				>
					<Option value='all'>Все планы</Option>
					<Option value='fullPeriod'>Полный</Option>
					<Option value='trialPeriod'>Пробный</Option>
				</Select>

				<Select
					value={statusFilter}
					onChange={setStatusFilter}
					style={{ width: 160 }}
				>
					<Option value='all'>Все статусы</Option>
					<Option value='active'>Активные</Option>
					<Option value='stop'>Сервис остановлен</Option>
				</Select>

				<Select
					value={courseFilter}
					onChange={setCourseFilter}
					style={{ width: 160 }}
				>
					<Option value='all'>Все курсы</Option>
					{courseItems?.map(item => (
						<Option key={item?.value} value={item?.value}>
							{item?.label}
						</Option>
					))}
				</Select>

				<Checkbox
					checked={todayOnly}
					onChange={e => setTodayOnly(e.target.checked)}
				>
					Работали сегодня
				</Checkbox>

				<Checkbox checked={idle} onChange={e => setIdle(e.target.checked)}>
					Неактивные {'>'} 5 дн.
				</Checkbox>
			</Space>

			<Button
				type='primary'
				style={{ width: '80px' }}
				onClick={() => setAddUserOpen(true)}
			>
				+ Студент
			</Button>
		</Row>
	)
}

export default MonitoringFilter
