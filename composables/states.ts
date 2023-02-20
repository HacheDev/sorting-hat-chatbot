import Answer from "~~/utils/classes/Answer"
import Question from "~~/utils/classes/Question"
import Scores from "~~/utils/classes/Scores"
import TextMessage from "~~/utils/classes/TextMessage"
import { getMessageTime } from "~~/utils/functions/getMessageTime"

export const useQuestionsLoaded = () => useState<boolean>("questionsLoaded", () => false)
export const useQuestionsList = () => useState<Question[]>("questionsList")
export const useQuestionNumber = () => useState<number>("questionNumber", () => 0)
export const useCurrentQuestion = () => useState<Question>("currentQuestion")
export const useMessages = () =>   useState<TextMessage[]>("textMessages", () => [new TextMessage("bot", "invent", getMessageTime()), new TextMessage("user", "invent2", getMessageTime())])
export const useIsAnswerEmpty = () => useState<boolean>("isAnswerEmpty", () => true)
export const useSelectedAnswer = () =>  useState<Answer>("selectedAnswer", () => new Answer("Select an answer below", new Scores(0,0,0,0)))
export const useIsBotTurn = () => useState<boolean>("isBotTurn", () => false)
export const useIsNameChosen = () => useState<boolean>("isNameChosen", () =>    false)
export const useUserName = () =>    useState<string>("userName")
export const useTotalScores = () => useState<Scores>("totalScores", () =>  new Scores(0, 0, 0, 0))