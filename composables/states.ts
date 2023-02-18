import Answer from "~~/utils/classes/Answer"
import Question from "~~/utils/classes/Question"
import Scores from "~~/utils/classes/Scores"
import TextMessage from "~~/utils/classes/TextMessage"
import { getMessageTime } from "~~/utils/functions/getMessageTime"

export const useQuestionNumber = () => useState<number>("questionNumber", () => 0)
export const useCurrentQuestion = () => {
    const currentQuestion = useState<Question>("currentQuestion")
    const setQuestion = async() => {
        try {
            currentQuestion.value = await useAsyncData("questions",() => queryContent(useState("localeState").value + "/questions").findOne()).data.value.body[useQuestionNumber().value]
        } catch (error) {
            
        }
    }
    return { currentQuestion, setQuestion }
}
export const useMessages = () =>   useState<TextMessage[]>("textMessages", () => [new TextMessage("bot", "invent", getMessageTime()), new TextMessage("user", "invent2", getMessageTime())])
export const useIsAnswerEmpty = () => useState<boolean>("isAnswerEmpty", () => true)

export const useSelectedAnswer = () =>  useState<Answer>("selectedAnswer", () => new Answer("Select an answer below", new Scores(0,0,0,0)))
// export const useSelectedAnswer = () =>  {
//     const selectedAnswer = useState<Answer>("selectedAnswer")
//     // const { pending, data: defaultAnswer } = async() => await useAsyncData("defaultAnswer", () =>  queryContent(useState("localeState").value + "/default-answer").findOne())
//     const setDefaultAnswer = async() => {
//         try {
//             selectedAnswer.value = await useAsyncData("defaultAnswer", () =>  queryContent(useState("localeState").value + "/default-answer").findOne()).data.value
//         } catch (error) {
            
//         }
//     }
//     setDefaultAnswer()
//     return { selectedAnswer, setDefaultAnswer }
// }
