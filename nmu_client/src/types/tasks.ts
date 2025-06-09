export interface ITaskA {
  order: number
  type: 'a'
  correctAnswer: {
    arabicLetter: string
    audioFileName: string
    lessonCode: string
  }
  variants: {
    arabicLetter: string
    audioFileName: string
    lessonCode: string
  }[]
}