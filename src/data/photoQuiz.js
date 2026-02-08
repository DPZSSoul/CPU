/** Photo quiz - which part is this? */

import { DEEP_PART_IDS, DEEP_PARTS } from './deepLearning'

const VISUAL_PARTS = DEEP_PART_IDS.filter((id) => id !== 'vram')

const pickWrong = (correct) => VISUAL_PARTS.filter((i) => i !== correct)

export const PHOTO_QUIZ_ITEMS = VISUAL_PARTS.map((id) => ({
  id,
  image: `/images/parts/${id}.jpg`,
  correctAnswer: id,
  wrongAnswers: pickWrong(id).slice(0, 3),
}))

export const PART_NAMES = DEEP_PARTS
export { DEEP_PARTS }
