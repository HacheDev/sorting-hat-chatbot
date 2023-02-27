import Answer from "~~/utils/classes/Answer"
import Scores from "~~/utils/classes/Scores"
import TextMessage from "~~/utils/classes/TextMessage"
import { getMessageTime } from "~~/utils/functions/getMessageTime"
import { useIsNameChosen, useLocale, useTotalScores } from "./states"

/**
 * Sets selectedAnswer state
 * @param {Answer} answer 
 */
export const selectAnswer = (answer: Answer) => {
    const isBotTurn = useIsBotTurn()
    const selectedAnswer = useSelectedAnswer()
    const isAnswerEmpty = useIsAnswerEmpty()
    if(!isBotTurn.value) {
        selectedAnswer.value = new Answer(answer.title, answer.scores)
        isAnswerEmpty.value = false
        document.getElementById("selected-answer")?.focus()
    }
}

/**
 * Async function for asking user name
 * @param { number } duration 
 * @returns {Promise}
 */
export const sendNameQuestion = async(duration: number): Promise<unknown> =>  {
    const currentLocale = useLocale()
    const { data: nameQuestion } = await useAsyncData(() => queryContent(currentLocale.value + "/name-question").findOne())
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

/**
 * Function for sending user answer
 */
export const sendAnswer = async() => {
    const isAnswerEmpty = useIsAnswerEmpty()
    const isBotTurn = useIsBotTurn()
    const selectedAnswer = useSelectedAnswer()
    
    if(!isAnswerEmpty.value && !isBotTurn.value) {
        isAnswerEmpty.value = true
        isBotTurn.value = true

        const questionNumber = useQuestionNumber()
        const messages = useMessages()
        const selectedAnswer = useSelectedAnswer()
        const questionsList = useQuestionsList()
        const totalScores = useTotalScores()

        
        messages.value.push(new TextMessage("user", selectedAnswer.value.title, getMessageTime()))
        totalScores.value.addScores(selectedAnswer.value.scores)
        selectedAnswer.value.title = ""
        ++questionNumber.value
   
        if (questionsList.value.length <= questionNumber.value) {
            await sendResult(1500)
        } else {
            await sendBotMessage(1500)
        }
    }
}

/**
 * Async function for sending bot messages
 * @param {number} duration 
 * @returns {Promise}
 */
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


/**
 * 
 * @returns {Promise<string>} Promise that returns winner house and max score
 */
export const getResult = async(): Promise<string> => {
    const currentLocale = useLocale()
    const userName = useUserName()
    const totalScores = useTotalScores()

    const { data: resultsMessage } = await useAsyncData(() => queryContent(currentLocale.value + "/results-message").findOne())

    const result: string = resultsMessage.value.greeting + userName.value + ", " 
        + resultsMessage.value.assigned + totalScores.value.getWinnerHouse() 
        + resultsMessage.value.score + totalScores.value.getMaxScore() 
        + resultsMessage.value.points

    return result
}

/**
 * 
 * @returns {Promise<string>} Promise that returns full results
 */
export const getTotalResults = async(): Promise<string> =>    {
    const currentLocale = useLocale()
    const userName = useUserName()
    const totalScores = useTotalScores()

    const { data: resultsMessage } = await useAsyncData(() => queryContent(currentLocale.value + "/results-message").findOne())

    const totalResults: string = resultsMessage.value.totalScores 
        + "\n" + "Gryffindor: " + totalScores.value.g + resultsMessage.value.points 
        + "\n" + "Hufflepuff: " + totalScores.value.h + resultsMessage.value.points 
        + "\n" + "Ravenclaw: " + totalScores.value.r + resultsMessage.value.points 
        + "\n" + "Slytherin: " + totalScores.value.s + resultsMessage.value.points

    return totalResults
}

/**
 * Async function for sending message with the results
 * @param {number} duration 
 * @returns {Promise}
 */
export const sendResult = async(duration: number): Promise<unknown> =>  {
    const messages = useMessages()
    const isBotTurn = useIsBotTurn()
    const currentLocale = useLocale()

    const { data: resultsMessage } = await useAsyncData(() => queryContent(currentLocale.value + "/results-message").findOne())
    const result: string = await getResult()
        
    let totalResults: string = await getTotalResults()
    
    return new Promise(() => setTimeout(() =>   {

        messages.value.push(new TextMessage("bot", result, getMessageTime()))
        messages.value.push(new TextMessage("bot", totalResults, getMessageTime()))
        isBotTurn.value = false
    }, duration))
}

/**
 * Async function for saving user name
 */
export const saveUserName = async() =>   {
    const currentLocale = useLocale()
    const messages = useMessages()
    const userName = useUserName()

    const { data: defaultUserName } = await useAsyncData("defaultUserName", () =>  queryContent(currentLocale.value + "/chat-info").only(["defaultUserName"]).findOne())


    if(!userName.value)    {
        userName.value = defaultUserName.value.defaultUserName
    }
    messages.value.push(new TextMessage("user", userName.value, getMessageTime()))
    useIsNameChosen().value = true
    await sendBotMessage(1500)
}

/**
 * Function for scrolling into current message
 */
export const scrollToMessage = () =>   {
    
    const messageId = computedMessageId()

    const messageElement = document.getElementById(messageId.value)
    
    if(messageElement)  {
        messageElement.scrollIntoView({behavior: "smooth"})
    }
}

/**
 * Function for restarting quiz and scores
 */
export const restartChat = async() =>    {
    const questionNumber = useQuestionNumber()
    const isNameChosen = useIsNameChosen()
    const userName = useUserName()
    const totalScores = useTotalScores()
    const messages = useMessages()

    questionNumber.value = 0
    isNameChosen.value = false
    userName.value = ""
    totalScores.value = new Scores(0, 0, 0, 0)
    messages.value = []

    await sendNameQuestion(1000)
}