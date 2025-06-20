/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { LessonService } from 'src/lesson/lesson.service';
import { TaskService } from 'src/task/task.service';
import { User } from 'src/user/entities/user.entity';
import * as XLSX from 'xlsx';

const descriptions: Record<string, { kk: string; ru: string }> = {
  a: {
    kk: 'Аудионы тыңдап, дұрыс мәтінді таңда.',
    ru: 'Прослушай аудио и выбери правильный текст.',
  },
  b: {
    kk: 'Бір әріп пен 4 аудио берілген. Дұрыс аудионы таңда.',
    ru: 'Одна буква и 4 аудио. Найди подходящее аудио.',
  },
  c: {
    kk: 'Аудио және екі ұқсас әріп берілген. Дұрыс әріпті таңда.',
    ru: 'Дано аудио и две похожие буквы. Найди правильную.',
  },
  e: {
    kk: 'Әріптер берілген. Оларды сөздің басы, ортасы, не соңында табыңыз.',
    ru: 'Даны буквы. Найди, где они встречаются — в начале, середине или конце слова.',
  },
  f: {
    kk: 'Әріп және үш сөз берілген. Әріп қайда кездесетінін таңда (бірнеше дұрыс жауап болуы мүмкін).',
    ru: 'Дана буква и три варианта. Отметь, где встречается буква (может быть несколько ответов).',
  },
  g: {
    kk: 'Аудионы тыңдап, берілген әріптерден сөз құрастыр.',
    ru: 'Прослушай аудио и собери слово из данных букв.',
  },
};

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
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async uploadTasksByType(files: Express.Multer.File[], type: string) {
    if (!files?.length || files.length < 2) {
      throw new Error('Необходимо загрузить два файла: ru и kk');
    }

    // Определяем какой файл для какого языка по имени файла (например, ..._kk.json или ..._ru.json)
    const langs = ['ru', 'kk'];
    const dataByLang: Record<'ru' | 'kk', any[]> = { ru: [], kk: [] };

    for (const file of files) {
      let lang: 'ru' | 'kk' | undefined;
      if (file.originalname.includes('_kk') || file.originalname.endsWith('kk.json')) lang = 'kk';
      else if (file.originalname.includes('_ru') || file.originalname.endsWith('ru.json')) lang = 'ru';

      if (!lang) throw new Error('Файл должен иметь суффикс _ru или _kk');

      try {
        const parsedJson = JSON.parse(file.buffer.toString('utf-8'));
        if (!Array.isArray(parsedJson)) throw new Error('Ожидался массив задач');
        dataByLang[lang] = parsedJson;
      } catch (err: any) {
        throw new Error('Ошибка при парсинге JSON: ' + err.message);
      }
    }

    const allowedTypes = ['a', 'b', 'c', 'e', 'f', 'g', 'tajvidA', 'tajvidB', 'tajvidC', 'tajvidD'];
    if (!allowedTypes.includes(type)) {
      throw new Error(`Недопустимый тип задачи: ${type}`);
    }

    // --- Собираем по lessonCode ---
    function extractLessonCode(task: any): string | undefined {
      if (task.lessonCode) return task.lessonCode;
      if (task.correctAnswer?.lessonCode) return task.correctAnswer.lessonCode;
      if (task.correctLetter?.lessonCode) return task.correctLetter.lessonCode;
      if (task.data?.lessonCode) return task.data.lessonCode;
      if (Array.isArray(task.data)) {
        const found = task.data.find((d: any) => d.lessonCode);
        return found?.lessonCode;
      }
      return undefined;
    }

    const tasksByLessonCode: Record<string, { ru: any[]; kk: any[] }> = {};

    // Для каждого языка раскладываем задачи по lessonCode
    for (const lang of langs) {
      for (const task of dataByLang[lang]) {
        const lessonCode = extractLessonCode(task);
        if (!lessonCode) continue;
        if (!tasksByLessonCode[lessonCode]) tasksByLessonCode[lessonCode] = { ru: [], kk: [] };
        tasksByLessonCode[lessonCode][lang].push(task);
      }
    }

    // --- Сохраняем в БД ---
    const created: { lessonCode: string; id: string }[] = [];

    for (const [lessonCode, data] of Object.entries(tasksByLessonCode)) {
      const createTaskInput = {
        type,
        lessonCode,
        description: descriptions[type] || { kk: '', ru: '' },
        data,
      };
      const result = await this.taskService.create(createTaskInput as any);
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

  async uploadAndSaveUser(file: Express.Multer.File) {
    if (!file?.buffer) throw new BadRequestException('Файл отсутствует или повреждён');

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];
    const users: { userName?: string; phoneNumber?: string }[] = XLSX.utils.sheet_to_json(sheet);

    function normalizePhoneNumber(raw: string | number): string {
      let phone = String(raw).replace(/\D/g, '');
      if (phone.length === 10) {
        phone = '8' + phone;
      } else if (phone.length === 11) {
        phone = '8' + phone.slice(1);
      }
      return phone;
    }

    const createdUsers: User[] = [];
    for (const user of users) {
      if (!user.userName || !user.phoneNumber) continue;

      const phoneNumber = normalizePhoneNumber(user.phoneNumber);

      try {
        const created = await this.authService.register({
          userName: user.userName,
          phoneNumber,
          password: 'nmu1234',
          userRole: 'student',
        });
        createdUsers.push(created.user);
      } catch (e) {
        console.log(e);
      }
    }

    return {
      message: `Добавлено ${createdUsers.length} пользователей`,
      users: createdUsers,
    };
  }
}
