import { ComputedRef, Ref } from "nuxt/dist/app/compat/capi"
import Answer from "~~/utils/classes/Answer"
import Question from "~~/utils/classes/Question"
import Scores from "~~/utils/classes/Scores"
import TextMessage from "~~/utils/classes/TextMessage"

/**
 * 
 * @returns {Ref<string>} current locale, useful since usei18n cant be imported outside vue files
 */
export const useLocale = (): Ref<string> => useState<string>("locale")

/**
 * 
 * @returns {Ref<boolean>} true if questions already loaded, false otherwise
 */
export const useQuestionsLoaded = (): Ref<boolean> => useState<boolean>("questionsLoaded", () => false)

/**
 * 
 * @returns {Ref<Question[]>} list of questions
 */
export const useQuestionsList = (): Ref<Question[]> => useState<Question[]>("questionsList")

/**
 * 
 * @returns {Ref<number>} current question number
 */
export const useQuestionNumber = (): Ref<number> => useState<number>("questionNumber", () => 0)

/**
 * 
 * @returns {Ref<TextMessage[]>} list of messages
 */
export const useMessages = (): Ref<TextMessage[]> =>   useState<TextMessage[]>("textMessages")

/**
 * 
 * @returns {Ref<boolean>} true if an answer is selected, false otherwise
 */
export const useIsAnswerEmpty = (): Ref<boolean> => useState<boolean>("isAnswerEmpty", () => true)

/**
 * 
 * @returns {Ref<Answer>} current selected answer
 */
export const useSelectedAnswer = (): Ref<Answer> =>  useState<Answer>("selectedAnswer")

/**
 * 
 * @returns {Ref<boolean>} true if its bot's turn, false otherwise
 */
export const useIsBotTurn = (): Ref<boolean> => useState<boolean>("isBotTurn", () => true)

/**
 * 
 * @returns {Ref<boolean>} true is user has chosen a name (or has been assigned default name)
 */
export const useIsNameChosen = (): Ref<boolean> => useState<boolean>("isNameChosen", () =>    false)

/**
 * 
 * @returns {Ref<string>} user name
 */
export const useUserName = (): Ref<string> =>    useState<string>("userName")

/**
 * 
 * @returns {Ref<Scores>} current total scores
 */
export const useTotalScores = (): Ref<Scores> => useState<Scores>("totalScores", () =>  new Scores(0, 0, 0, 0))
