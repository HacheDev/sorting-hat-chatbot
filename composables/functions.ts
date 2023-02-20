import Answer from "~~/utils/classes/Answer"
import TextMessage from "~~/utils/classes/TextMessage"
import { getMessageTime } from "~~/utils/functions/getMessageTime"
import { useIsNameChosen } from "./states"

export const selectAnswer = (answer: Answer) => {
    const isBotTurn = useIsBotTurn()
    if(!isBotTurn.value) {
        useSelectedAnswer().value = new Answer(answer.title, answer.scores)
        useIsAnswerEmpty().value = false
    }
}

export const sendAnswer = async() => {
    const isAnswerEmpty = useIsAnswerEmpty()
    const isBotTurn = useIsBotTurn()
    
    if(!isAnswerEmpty.value && !isBotTurn.value) {
        isAnswerEmpty.value = true
        isBotTurn.value = true

        const questionNumber = useQuestionNumber()
        const messages = useMessages()
        const currentQuestion = useCurrentQuestion()
        const selectedAnswer = useSelectedAnswer()
        const questionsList = useQuestionsList()

        
        messages.value.push(new TextMessage("user", selectedAnswer.value.title, getMessageTime()))
        ++questionNumber.value
        await sendBotMessage(1000)
        // setTimeout(() =>    {
            // currentQuestion.value = questionsList.value[questionNumber.value]
            // messages.value.push(new TextMessage("bot", currentQuestion.value.title, getMessageTime()))
        // },5000)
    }
}

export const sendBotMessage = async(duration: number): Promise<unknown> => {
    const currentQuestion = useCurrentQuestion()
    const messages = useMessages()
    const questionNumber = useQuestionNumber()
    const questionsList = useQuestionsList()
    const isBotTurn = useIsBotTurn()
    
    return new Promise(() => setTimeout(() =>   {
        currentQuestion.value = questionsList.value[questionNumber.value]
        messages.value.push(new TextMessage("bot", currentQuestion.value.title, getMessageTime()))
        isBotTurn.value = false
    }, duration))
}

export const saveUserName = async() =>   {
    const { data: defaultUserName } = await useAsyncData("defaultUserName", () =>  queryContent(useCurrentLocale().value + "/chat-names").only(["defaultUserName"]).findOne())
    if(!useUserName().value)    {
        useUserName().value = defaultUserName.value.defaultUserName
    }
    useIsNameChosen().value = true
}