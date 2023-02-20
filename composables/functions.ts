import Answer from "~~/utils/classes/Answer"
import TextMessage from "~~/utils/classes/TextMessage"
import { getMessageTime } from "~~/utils/functions/getMessageTime"
import { useIsNameChosen, useTotalScores } from "./states"

export const selectAnswer = (answer: Answer) => {
    const isBotTurn = useIsBotTurn()
    if(!isBotTurn.value) {
        useSelectedAnswer().value = new Answer(answer.title, answer.scores)
        useIsAnswerEmpty().value = false
    }
}

export const sendNameQuestion = async(duration: number): Promise<unknown> =>  {
    const { locale } = useI18n()
    const { data: nameQuestion } = await useAsyncData(() => queryContent(locale.value + "/name-question").findOne())
    const messages = useMessages()
    const isBotTurn = useIsBotTurn()
    const currentQuestion = useCurrentQuestion()
    const questionsList = useQuestionsList()
    const questionNumber = useQuestionNumber()

    return new Promise(() => setTimeout(() =>   {
        currentQuestion.value = questionsList.value[questionNumber.value]
        messages.value = [new TextMessage("bot", nameQuestion.value.title, getMessageTime())]
        isBotTurn.value = false
    }, duration))
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
        const totalScores = useTotalScores()

        
        messages.value.push(new TextMessage("user", selectedAnswer.value.title, getMessageTime()))
        totalScores.value.addScores(selectedAnswer.value.scores)
        ++questionNumber.value
   
        if (questionsList.value.length <= questionNumber.value) {
            await sendResult(1000)
        } else {
            await sendBotMessage(1000)
        }
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

export const sendResult = async(duration: number): Promise<unknown> =>  {
    const messages = useMessages()
    const totalScores = useTotalScores()
    const userName = useUserName()
    const { locale } = useI18n()

    const isBotTurn = useIsBotTurn()
    // const result = totalScores.value.g.toString() + " " + totalScores.value.h.toString() + " " + totalScores.value.r.toString() + " " + totalScores.value.s.toString()
    const { data: resultsMessage } = await useAsyncData(() => queryContent(locale.value + "/results-message").findOne())
    let result: string = resultsMessage.value.greeting + userName.value + ", " + resultsMessage.value.assigned + totalScores.value.getWinnerHouse() + resultsMessage.value.score + totalScores.value.getMaxScore() + resultsMessage.value.points
    let totalResults: string = resultsMessage.value.totalScores + "\n" + "Gryffindor: " + totalScores.value.g + resultsMessage.value.points + "\n" + "Hufflepuff: " + totalScores.value.h + resultsMessage.value.points + "\n" + "Ravenclaw: " + totalScores.value.r + resultsMessage.value.points + "\n" + "Slytherin: " + totalScores.value.s + resultsMessage.value.points
    
    return new Promise(() => setTimeout(() =>   {

        messages.value.push(new TextMessage("bot", result, getMessageTime()))
        messages.value.push(new TextMessage("bot", totalResults, getMessageTime()))
        isBotTurn.value = false
    }, duration))
}

export const saveUserName = async() =>   {
    const { locale } = useI18n()
    const { data: defaultUserName } = await useAsyncData("defaultUserName", () =>  queryContent(locale.value + "/chat-names").only(["defaultUserName"]).findOne())
    const messages = useMessages()
    const userName = useUserName()
    if(!userName.value)    {
        userName.value = defaultUserName.value.defaultUserName
    }
    messages.value.push(new TextMessage("user", userName.value, getMessageTime()))
    useIsNameChosen().value = true
    // await sendBotMessage(1000)
}


// export const saveUserName = async() =>   {
//     const { locale } = useI18n()
//     const { data: defaultUserName } = await useAsyncData("defaultUserName", () =>  queryContent(locale.value + "/chat-names").only(["defaultUserName"]).findOne())
//     // const messages = useMessages()
//     const userName = useUserName()
//     if(!userName.value)    {
//         userName.value = defaultUserName.value.defaultUserName
//     }
//     // messages.value.push(new TextMessage("user", userName.value, getMessageTime()))
//     useIsNameChosen().value = true
//     // await sendBotMessage(1000)
// }

// export const saveUserName = async() =>   {
//     const { locale } = useI18n()
//     const { data: defaultUserName } = await useAsyncData("defaultUserName", () =>  queryContent(locale.value + "/chat-names").only(["defaultUserName"]).findOne())
//     const messages = useMessages()
//     const userName = useUserName()
//     if(!userName.value)    {
//         userName.value = defaultUserName.value.defaultUserName
//     }
//     messages.value.push(new Message("user", userName.value, getMessageTime()))
//     useIsNameChosen().value = true
//     await sendBotMessage(1000)
// }