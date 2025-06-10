import { shuffle } from 'lodash'

interface IData {
	order: number
}

export function prepareTasks(data: IData[]) {
	if (!Array.isArray(data)) return []

	// 1. Найти максимальный order
	const maxOrder = Math.max(...data.map(x => x.order ?? 0), 0)

	// 2. Скопировать массив, увеличить order у копии, перемешать копию
	const copied = data.map(item => ({
		...item,
		order: (item.order ?? 0) + maxOrder + 1,
		// можно добавить признак копии если нужно
	}))
	const mixedCopied = shuffle(copied) // перемешать рандомно

	// 3. Соединить оригинал + рандом копии
	return [...data, ...mixedCopied]
}
