import axios from 'axios';
import { writeFileSync } from 'fs';

interface TransformedTaskE {
  type: string;
  order: number;
  lessonCode: string;
  data: any;
}

async function fetchAndTransformE() {
  try {
    const { data } = await axios.get('https://nmacademy.kz/back/task');
    const tasks: any[] = data;
    const type = 'tajvid-14l-1t';

    const grouped: TransformedTaskE[] = [];
    const seenLessons: Set<string> = new Set();

    tasks.forEach((taskBlock) => {
      const taskType = (taskBlock.type ?? '').toLowerCase();
      const lessonCode = taskBlock.lesson?.name;

      if (taskType !== type || !taskBlock.task_json || !lessonCode) return;
      if (seenLessons.has(lessonCode)) return;

      seenLessons.add(lessonCode);

      let parsedJson: any;
      try {
        parsedJson = JSON.parse(taskBlock.task_json);
        if (typeof parsedJson !== 'object') throw new Error('task_json is not an object');
      } catch (e) {
        console.warn(`⚠️ Проблема с JSON в lesson "${lessonCode}": ${e.message}`);
        return;
      }

      grouped.push({
        type,
        order: grouped.length + 1,
        lessonCode,
        data: parsedJson,
      });
    });

    writeFileSync('taskDataJson_tajvid-14L-1T_filtered.json', JSON.stringify(grouped, null, 2), 'utf-8');
    console.log(`✅ Сохранено ${grouped.length} задач типа E в taskDataJson_tajvid-14L-1T_filtered.json`);
  } catch (error: any) {
    console.error('❌ Ошибка запроса:', error.message);
  }
}

fetchAndTransformE();
