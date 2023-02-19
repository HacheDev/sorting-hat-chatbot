<template>
    <span v-if="!isAnswerEmpty && selectedAnswer.title">{{ selectedAnswer.title }}</span>
    <!-- <span v-else-if="!pending && defaultAnswer">{{ defaultAnswer["title"] }}</span> -->
    <button @click="sendAnswer()">send</button>
    <div v-if="questionsLoaded && currentAnswers" class="answers-container">
        <button v-for="answer in currentAnswers" :key="answer.title" @click="selectAnswer(answer)">{{ answer.title }}</button>
    </div>
</template>

<script lang="ts" setup>
import { ComputedRef } from '@vue/reactivity';
import Answer from '~~/utils/classes/Answer';
import Question from '~~/utils/classes/Question';
import TextMessage from '~~/utils/classes/TextMessage';
import { getMessageTime } from '~~/utils/functions/getMessageTime';


// const { pending, data: defaultAnswer } = await useAsyncData("defaultAnswer", () =>  queryContent(useCurrentLocale().value + "/default-answer").findOne())

const isAnswerEmpty = useIsAnswerEmpty()
const selectedAnswer = useSelectedAnswer()
const questionsLoaded = useQuestionsLoaded()
const questionsList = useQuestionsList()


const questionNumber = useQuestionNumber()

const currentAnswers = computed<Answer[]>(() =>  currentQuestion.value.answers)

const currentQuestion = useCurrentQuestion()

const selectAnswer = (answer: Answer) => {
    selectedAnswer.value = new Answer(answer.title, answer.scores)
    isAnswerEmpty.value = false
}
const messages = useMessages()
const sendAnswer = () => {
    if(!isAnswerEmpty.value) {
        messages.value.push(new TextMessage("user", selectedAnswer.value.title, getMessageTime()))
        ++questionNumber.value
        currentQuestion.value = questionsList.value[questionNumber.value]
        isAnswerEmpty.value = true
    }
}
</script>