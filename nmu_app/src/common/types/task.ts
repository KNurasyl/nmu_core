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
  data: any[];
}
