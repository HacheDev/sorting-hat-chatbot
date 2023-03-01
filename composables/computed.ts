import { ComputedRef } from "nuxt/dist/app/compat/capi"
import Answer from "~~/utils/classes/Answer"
import Question from "~~/utils/classes/Question"

/**
 * 
 * @returns {ComputedRef<string>} last message id
 */
export const computeMessageId = (): ComputedRef<string> => computed<string>((): string => {
    const messages = useMessages()
    if(messages.value)    {
        return "message--" + (messages.value.length - 1)
    }
    else    {
        return ""
    }
})

/**
 * 
 * @returns {ComputedRef<Question>} computed current question
 */
export const computeCurrentQuestion = (): ComputedRef<Question> => computed<Question>((): Question =>    {
    const questionsList = useQuestionsList()
    const questionNumber = useQuestionNumber()

    if(questionsList.value) {
        return questionsList.value[questionNumber.value]
    }
})

/**
 * 
 * @returns {ComputedRef<Answer[]>} computed answers from current question
 */
export const computeCurrentAnswers = (): ComputedRef<Answer[]> => computed<Answer[]>(() =>  {
    const currentQuestion = computeCurrentQuestion()
    return currentQuestion.value.answers
})

/**
 * 
 * @returns {ComputedRef<number>} computed number of messages in chat
 */
export const computeNumOfMessages = (): ComputedRef<number> => computed<number>(() =>   {
    const messages = useMessages()
    return messages.value.length
})
