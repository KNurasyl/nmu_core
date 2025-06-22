export interface IVariant {
  arabicLetter: string;
  audioFileName: string;
  lessonCode: string;
}

export interface ITaskAB {
  type: 'ab';
  order: number;
  correctAnswer: IVariant;
  variants: IVariant[];
}

export interface ITaskC {
  type: 'c';
  order: number;
  correctAnswer: IVariant;
  similarLetter: IVariant;
}

export interface ITaskE {
  type: 'e';
  order: number;
  lessonCode: string;
  quiz: {
    position: 'start' | 'middle' | 'end';
    correctVariants: { letter: string }[];
    inCorrectVariants: { letter: string }[];
  };
}

export interface ITaskF {
  type: 'f';
  order: number;
  lessonCode: string;
  data: {
    letter: string;
    types: string[];
  };
}

export interface ITaskG {
  type: 'g';
  order: number;
  lessonCode: string;
  data: {
    correctLetter: string;
    variants: string[];
    audioFileName: string;
  };
}

export interface ITaskTajvid {
  type: string;
  order: number;
  lessonCode: string;
  data: unknown[];
}

// tajvid-1l-1t, tajvid-1l-2t, tajvid-3l-1t, tajvid-3l-2t, tajvid-4l-1t, tajvid-5l-1t

export interface ITajvid1l1t {
  type: 'tajvid-1l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-1';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Поле question содержит слова, оно дается как предмет задачи с которого нужно найти правильный вариант, который дается в массиве variants. Юзер выбирает букву из вариантов и потом она сопоставляется полю correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: string;
    audioFileName: string;
    correctVariant: string;
    variants: string[];
    description: 'Какой мад используется в этом слове?';
  };
}

export interface ITajvid1l2t {
  type: 'tajvid-1l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-1';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Поле question содержит слова с многоточием, оно дается как предмет задачи с которого нужно найти правильный вариант, который дается в массиве variants. Юзер выбирает букву из вариантов который должен встать вместо многоточие и потом она сопоставляется полю correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из correctAnswer и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: string;
    correctAnswer: string;
    audioFileName: string;
    correctVariant: string;
    variants: string[];
    description: 'Выберите правильную букву для вставки в предложение.';
  };
}

export interface ITajvid2l1t {
  type: 'tajvid-2l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-2';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается послушать audioFileName который в корне объекта и дается варианты из массива variants только текст item. Юзер слушает аудио и находит подходящий текст(item) и оно сравнивается с correctAnswer. После того как успешно ответил воспроизводиться в модалке аудио с текстом из correctAnswer и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    correctAnswer: string;
    audioFileName: string;
    variants: {
      item: string;
      audioFileName: string;
    }[];
    description: 'Прослушайте аудио и выберите правильный вариант.';
  };
}

export interface ITajvid2l2t {
  type: 'tajvid-2l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-2';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается послушать audioFileName который в корне объекта и дается варианты из массива variants только текст item. Юзер слушает аудио и находит подходящий текст(item) и в нем есть isCorrect и если оно true то считается что ответил правильно. После того как успешно ответил воспроизводиться в модалке аудио с текстом из correctAnswer и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: string;
    correctAnswer: string;
    audioFileName: string;
    variants: {
      item: 'касра' | 'домма' | 'фатха';
      isCorrect: boolean;
    }[];
    description: 'Выберите правильный тануин (фатха, касра или домма), который нужно вставить в пропущенное место';
  };
}

export interface ITajvid3l1t {
  type: 'tajvid-3l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-3';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру question в котором текст дается в формате a + b = ?. И дается варианты виде текста из массива variants и юзер выбирает и делается сравнение с item из correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из correctVariant.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: string;
    correctAnswer: {
      item: string;
      audioFileName: string;
    };
    variants: {
      item: string;
      isCorrect: boolean;
    }[];
    description: 'Выберите правильное слово с шаддой (удвоенной буквой) на основе соединения двух частей.';
  };
}

export interface ITajvid3l2t {
  type: 'tajvid-3l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-3';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру question в котором текст дается в формате a + b. И дается варианты виде текста из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из correctVariant.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: string;
    correctAnswer: {
      item: string;
      audioFileName: string;
    };
    variants: string[];
    correctVariant: string;
    description: 'Выберите правильное слово, в котором шадда (удвоенная буква) написана верно.';
  };
}

export interface ITajvid4l1t {
  type: 'tajvid-4l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-4';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру question в котором текст аята. И дается варианты виде текста из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из correctVariant.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: string;
    variants: {
      item: string;
      audioFileName: string;
    }[];
    correctVariant: {
      item: string;
      audioFileName: string;
    };
    description: `Выберите слово, в котором есть буква 'та марбута' из приведённого аята.`;
  };
}

export interface ITajvid4l2t {
  type: 'tajvid-4l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-4';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру question в котором текст аята. И дается варианты виде аудио из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из найденного variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: {
      item: string;
      audioFileName: string;
    };
    variants: {
      item: string;
      audioFileName: string;
    }[];
    correctVariant: string;
    description: `Выберите правильное чтение буквы 'та марбута' в конце слова.`;
  };
}

export interface ITajvid5l1t {
  type: 'tajvid-5l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-5';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру question в котором текст аята. И дается варианты виде текста из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: {
      item: string;
      audioFileName: string;
    };
    variants: {
      item: string;
      audioFileName: string;
    }[];
    correctVariant: string;
    description: `Найдите слово в аяте, в котором содержится правило, связанное с алифом и хамзой.`;
  };
}

export interface ITajvid5l2t {
  type: 'tajvid-5l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-5';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру question в котором текст аята. И дается варианты виде аудио из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: {
      item: string;
      audioFileName: string;
    };
    variants: {
      item: string;
      audioFileName: string;
    }[];
    correctVariant: string;
    description: `Выберите правильное чтение, связанное с алифом и хамзой, в приведённом аяте.`;
  };
}

export interface ITajvid6l1t {
  type: 'tajvid-6l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-6';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру question не дается а дается сразу варианты виде аудио из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из correctVariant.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    correctVariant: {
      item: string;
      audioFileName: string;
    };
    variants: {
      item: string;
      audioFileName: string;
    }[];
    description: `Выберите аят, в котором используется артикль 'Аль'.`;
  };
}

export interface ITajvid6l2t {
  type: 'tajvid-6l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-6';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается question в котором текст аята. И дается варианты виде аудио из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из correctVariant.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    question: {
      item: string;
      audioFileName: string;
    };
    variants: {
      item: string;
      audioFileName: string;
    }[];
    correctVariant: string;
    description: `Найдите правильное произношение артикля 'Аль' в данном аяте.`;
  };
}

export interface ITajvid7l1t {
  type: 'tajvid-7l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-7';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается варианты виде текста из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из найденного variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
    }[];
    correctVariant: string;
    description: `Выберите аят, в котором правильно соблюдено правило сукуна на букве 'мим'.`;
  };
}

export interface ITajvid7l2t {
  type: 'tajvid-7l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-7';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается варианты виде текста и аудио из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из найденного variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
    }[];
    correctVariant: string;
    description: `Выберите аят с правильным чтением правила суккун-мим.`;
  };
}

export interface ITajvid8l1t {
  type: 'tajvid-8l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-8';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается варианты виде текста и аудио из массива variants и юзер выбирает и делается сравнение с correctVariant. После того как успешно ответил воспроизводиться в модалке аудио с текстом из найденного variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
    }[];
    correctVariant: string;
    description: `Выберите аят, соответствующий правилу изгар или идгам.`;
  };
}

export interface ITajvid8l2t {
  type: 'tajvid-8l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-8';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается аят из question и дается варианты виде текста и аудио из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из найденного variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    question: string;
    description: `Выберите правильное произношение правила изгар или идгам.`;
  };
}

export interface ITajvid9l1t {
  type: 'tajvid-9l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-9';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается варианты виде текста и аудио из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из найденного variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    description: `Выберите аят, в котором правильно реализовано правило Ихфа или Иклаб.`;
  };
}

export interface ITajvid9l2t {
  type: 'tajvid-9l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-9';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается аят из question варианты виде аудио из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из найденного variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    question: string;
    description: `Выберите правильное произношение правила Ихфа или Иклаб.`;
  };
}

export interface ITajvid10l1t {
  type: 'tajvid-10l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-10';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается аудио из question варианты виде аудио из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      isCorrect: boolean;
    }[];
    question: {
      item: string;
      audioFileName: string;
    };
    description: `Прослушайте аудио и выберите правильное правило таджвида.`;
  };
}

export interface ITajvid10l2t {
  type: 'tajvid-10l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-10';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается текст аята из question варианты виде аудио из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из найденного variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    question: string;
    description: `Прослушайте аудио и выберите правильное произношение.`;
  };
}

export interface ITajvid10l3t {
  type: 'tajvid-10l-3t';
  order: number;
  lessonCode: 'tajvid-lesson-10';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается аудио и текст из variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    description: `Қалқала ережесін дұрыс табыңыз?`;
  };
}

export interface ITajvid11l1t {
  type: 'tajvid-11l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-11';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается аудио с текстом из question варианты виде текста из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      isCorrect: boolean;
    }[];
    question: {
      item: string;
      audioFileName: string;
    };
    description: `Прослушайте слово и выберите, применяется ли правило Тафхим (твердость) или Таркик (мягкость).`;
  };
}

export interface ITajvid11l2t {
  type: 'tajvid-11l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-11';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается текстом аят из question варианты виде аудио из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    question: string;
    description: `Прослушайте несколько вариантов и выберите правильное произношение.`;
  };
}

export interface ITajvid12l1t {
  type: 'tajvid-12l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-12';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается текстом аят и аудио из question варианты виде текста из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      isCorrect: boolean;
    }[];
    question: {
      item: string;
      audioFileName: string;
    };
    description: `Прослушайте аят и выберите правильное правило мадда.`;
  };
}

export interface ITajvid12l2t {
  type: 'tajvid-12l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-12';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается текстом аят из question и варианты виде аудио из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    question: string;
    description: `Прослушайте несколько вариантов и выберите правильное произношение.`;
  };
}

export interface ITajvid13l1t {
  type: 'tajvid-13l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-13';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается аудио аят из variants  и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из variants[найденный].audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    description: `Выберите аудио с правильным правилом мадда.`;
  };
}

export interface ITajvid13l2t {
  type: 'tajvid-13l-2t';
  order: number;
  lessonCode: 'tajvid-lesson-13';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается текстом аят из question и варианты виде аудио из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    question: string;
    description: `Прослушайте аудио и выберите правильный вариант чтения.`;
  };
}

export interface ITajvid14l1t {
  type: 'tajvid-14l-1t';
  order: number;
  lessonCode: 'tajvid-lesson-14';
  descForDev: 'data является содержанием задач. Каждый объект 1 вопрос. В объектах есть description который задается как описание задачи, что нужно делать в данной задаче. Юзеру дается текстом аят из question и варианты виде аудио из массива variants и юзер выбирает и делается сравнение с isCorrect который должен быть true. После того как успешно ответил воспроизводиться в модалке аудио с текстом из question.audioFileName и переходить дальше к другому объекту и так пока не закончиться весь массив';
  data: {
    variants: {
      item: string;
      audioFileName: string;
      isCorrect: boolean;
    }[];
    question: string;
    description: `Выберите правильный вариант чтения согласно правилу вакф или сакта.`;
  };
}

export interface ITajvidA {
  type: 'tajvidA';
  subType: 'tajvid-1l-1t' | 'tajvid-1l-2t' | 'tajvid-3l-1t' | 'tajvid-3l-2t' | 'tajvid-4l-1t' | 'tajvid-5l-1t';
  order: number;
  lessonCode: string;
  question: string;
  correctAnswer: string;
  audioFileName: string;
  correctVariant: string;
  variants: string[];
  description: string;
}

export interface ITajvidB {
  type: 'tajvidB';
  subType: 'tajvid-2l-1t' | 'tajvid-2l-2t' | 'tajvid-10l-1t' | 'tajvid-11l-1t' | 'tajvid-12l-1t';
  order: number;
  lessonCode: string;
  question: string;
  correctAnswer: string;
  audioFileName: string;
  variants: {
    item: string;
    isCorrect: boolean;
  }[];
  description: string;
}

export interface ITajvidC {
  type: 'tajvidC';
  subType:
    | 'tajvid-4l-2t'
    | 'tajvid-5l-2t'
    | 'tajvid-6l-2t'
    | 'tajvid-8l-2t'
    | 'tajvid-9l-2t'
    | 'tajvid-10l-2t'
    | 'tajvid-11l-2t'
    | 'tajvid-12l-2t'
    | 'tajvid-13l-2t'
    | 'tajvid-14l-1t';
}

export interface ITajvidD {
  type: 'tajvidD';
  subType:
    | 'tajvid-6l-1t'
    | 'tajvid-7l-1t'
    | 'tajvid-7l-2t'
    | 'tajvid-8l-1t'
    | 'tajvid-9l-1t'
    | 'tajvid-10l-3t'
    | 'tajvid-13l-1t';
}
