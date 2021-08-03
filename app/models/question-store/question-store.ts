import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Question, QuestionModel, QuestionSnapshot } from "../question/question"
import { withEnvironment } from "../extensions/with-environment"
import { GetQuestionsResult } from "../../services/api"
import uuid from "react-native-uuid"
import { decodeHTMLEntities } from "../../utils/html-decode"

const convertQuestion = (raw: any): QuestionSnapshot => {
  const id = uuid.v4().toString()
  const decodedQuestion = decodeHTMLEntities(raw.question)
  const decodedAnswers = raw.incorrect_answers.map((a) => decodeHTMLEntities(a))

  return {
    id: id,
    category: raw.category,
    type: raw.type,
    difficulty: raw.difficulty,
    question: decodedQuestion,
    correctAnswer: decodeHTMLEntities(raw.correct_answer),
    incorrectAnswers: decodedAnswers,
    guess: "",
  }
}
/**
 * Model description here for TypeScript hints.
 */
export const QuestionStoreModel = types
  .model("QuestionStore")
  .props({
    questions: types.optional(types.array(QuestionModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveQuestions: (questionSnapshots: QuestionSnapshot[]) => {
      const questionModels: Question[] = questionSnapshots.map(c => QuestionModel.create(c)) // create model instances from the plain objects
      self.questions.replace(questionModels) // Replace the existing data with the new data
    },
  }))
  .actions(self => ({
    getQuestions: async () => {
      const response = await self.environment.api.getQuestions()
      if (response.ok) {
        const rawQuestions = response.data.results
        rawQuestions.map(convertQuestion)
        self.saveQuestions(rawQuestions.map(convertQuestion))
      } else {
        __DEV__ && console.tron.log(response.kind)
      }
    },
  }));

type QuestionStoreType = Instance<typeof QuestionStoreModel>
export interface QuestionStore extends QuestionStoreType {}
type QuestionStoreSnapshotType = SnapshotOut<typeof QuestionStoreModel>
export interface QuestionStoreSnapshot extends QuestionStoreSnapshotType {}
export const createQuestionStoreDefaultModel = () => types.optional(QuestionStoreModel, {})
