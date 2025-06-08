/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// src/utils/load-task-data.ts
import * as fs from 'fs';
import * as path from 'path';

const taskData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/taskDataJson_typeAB.json'), 'utf-8'));

export function getTaskDataByLessonCode(lessonCode: string) {
  return taskData.filter((task: any) => task.lessonCode === lessonCode);
}
