/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { LessonService } from 'src/lesson/lesson.service';
import { TaskService } from 'src/task/task.service';
import * as XLSX from 'xlsx';

@Injectable()
export class UploadContentService {
  private readonly logger = new Logger(UploadContentService.name);

  constructor(
    @Inject(CourseService)
    private readonly courseService: CourseService,
    @Inject(LessonService)
    private readonly lessonService: LessonService,
    @Inject(TaskService)
    private readonly taskService: TaskService,
  ) {}

  async uploadTasksByType(file: Express.Multer.File, type: string) {
    if (!file?.buffer) {
      throw new Error('Файл отсутствует или повреждён');
    }

    let parsedJson: any[];

    try {
      parsedJson = JSON.parse(file.buffer.toString('utf-8'));
      if (!Array.isArray(parsedJson)) throw new Error('Ожидался массив задач');
    } catch (err: any) {
      throw new Error('Ошибка при парсинге JSON: ' + err.message);
    }

    const allowedTypes = [
      'a',
      'b',
      'c',
      'e',
      'f',
      'g',
      ...Array.from({ length: 14 }, (_, i) => [`tajvid-${i + 1}l-1t`, `tajvid-${i + 1}l-2t`]).flat(),
    ];

    if (!allowedTypes.includes(type)) {
      throw new Error(`Недопустимый тип задачи: ${type}`);
    }

    // Хелпер-функция для извлечения lessonCode
    const extractLessonCode = (task: any): string | undefined => {
      if (task.lessonCode) return task.lessonCode;
      if (task.correctAnswer?.lessonCode) return task.correctAnswer.lessonCode;
      if (task.correctLetter?.lessonCode) return task.correctLetter.lessonCode;
      if (task.data?.lessonCode) return task.data.lessonCode;
      if (Array.isArray(task.data)) {
        const found = task.data.find((d: any) => d.lessonCode);
        return found?.lessonCode;
      }
      return undefined;
    };

    const tasksByLessonCode: Record<string, any[]> = {};

    for (const task of parsedJson) {
      const lessonCode = extractLessonCode(task);
      if (!lessonCode) {
        console.warn('❗ Пропущен task без lessonCode:', task);
        continue;
      }

      if (!tasksByLessonCode[lessonCode]) {
        tasksByLessonCode[lessonCode] = [];
      }
      tasksByLessonCode[lessonCode].push(task);
    }

    const created: { lessonCode: string; id: string }[] = [];

    for (const [lessonCode, tasks] of Object.entries(tasksByLessonCode)) {
      const createTaskInput = {
        type,
        lessonCode,
        description: 'Импортировано через uploadTasksByType',
        data: {
          kz: tasks,
        },
      };

      const result = await this.taskService.create(createTaskInput as any); // Приведение к any если нет строгого DTO
      created.push({ lessonCode, id: result._id });
    }

    return {
      message: `✅ Создано ${created.length} задач(и) для типа "${type}"`,
      created,
    };
  }

  async uploadAndSave(file: Express.Multer.File) {
    const parsedData = this.parseExcel(file);
    return this.saveParsedContent(parsedData.preview);
  }

  private parseExcel(file: Express.Multer.File) {
    if (!file?.buffer) throw new BadRequestException('Файл отсутствует или повреждён');

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const result = {};

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      result[sheetName] = XLSX.utils.sheet_to_json(sheet);
    }

    return {
      message: 'Файл успешно прочитан',
      sheets: Object.keys(result),
      preview: result,
    };
  }

  private async saveParsedContent(parsedData: Record<string, any[]>) {
    const results: {
      courses: Course[];
      lessons: Lesson[];
    } = {
      courses: [],
      lessons: [],
    };
    // 1. Создание курсов
    if (parsedData['course']) {
      for (const row of parsedData['course']) {
        const course = await this.courseService.create({
          courseName: row.courseName,
          description: row.description || '',
          lang: row.lang || 'kz',
        });

        results.courses.push(course);
      }
    }

    // 2. Создание уроков
    if (parsedData['lesson']) {
      for (const row of parsedData['lesson']) {
        const course = await this.courseService.findByNameAndLang(row.courseName, row.lang);
        if (!course) {
          this.logger.warn(`Курс "${row.courseName}" (${row.lang}) не найден для урока "${row.lessonName}"`);
          continue;
        }

        const lesson = await this.lessonService.create({
          lessonName: row.lessonName,
          description: row.description || '',
          videoUrl: row.videoUrl || '',
          lessonCode: row.lessonCode || '',
          order: row.order || 0,
          lang: row.lang || 'kz',
          course: course._id,
        });

        results.lessons.push(lesson);
      }
    }

    return {
      message: 'Контент успешно импортирован',
      ...results,
    };
  }
}
