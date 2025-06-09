import { shuffle } from 'lodash'

export function prepareTasks(data: any[]) {
  if (!Array.isArray(data)) return [];

  // 1. Найти максимальный order
  const maxOrder = Math.max(...data.map(x => x.order ?? 0), 0);

  // 2. Скопировать массив, увеличить order у копии, перемешать копию
  const copied = data.map((item, i) => ({
    ...item,
    order: (item.order ?? 0) + maxOrder + 1,
    // можно добавить признак копии если нужно
  }));
  const mixedCopied = shuffle(copied); // перемешать рандомно

  // 3. Соединить оригинал + рандом копии
  return [...data, ...mixedCopied];
}
