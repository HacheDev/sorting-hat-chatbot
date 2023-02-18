<template>
    <span v-if="!isAnswerEmpty && selectedAnswer.title">{{ selectedAnswer.title }}</span>
    <span v-else-if="!pending && defaultAnswer">{{ defaultAnswer["title"] }}</span>
    <button @click="sendAnswer()">send</button>
    <!-- <div v-if="currentQuestion.answers[0]" class="answers-container">
        <button v-for="answer in currentQuestion.answers" :key="answer.title" @click="selectAnswer(answer)">{{ answer.title }}</button>
    </div> -->
</template>

<script lang="ts" setup>
import { ComputedRef } from '@vue/reactivity';
import Answer from '~~/utils/classes/Answer';
import Question from '~~/utils/classes/Question';
import TextMessage from "~~/utils/classes/TextMessage";
import { getMessageTime } from '~~/utils/functions/getMessageTime';
import { AnswerInterface } from '~~/utils/interfaces/AnswerInterface';

const { pending, data: defaultAnswer } = await useAsyncData("defaultAnswer", () =>  queryContent(useState("localeState").value + "/default-answer").findOne())

const isAnswerEmpty = useIsAnswerEmpty()
const selectedAnswer = useSelectedAnswer()
// const { selectedAnswer, setDefaultAnswer } = useSelectedAnswer()
// console.log(selectedAnswer.value)
const questionNumber = useQuestionNumber()
// const currentQuestion = useCurrentQuestion()
// const answers: ComputedRef<AnswerInterface[]> = computed(() =>    useState<Question>("currentQuestion").value.answers)
// const answers = useAnswers()
const { currentQuestion, setQuestion } = useCurrentQuestion()
await setQuestion()
// console.log(currentQuestion.value)
// const answers = computed(() => currentQuestion.currentQuestion.value.answers)

// console.log(currentQuestion.value.answers[1].title)
const selectAnswer = (answer: Answer) => {
    selectedAnswer.value = new Answer(answer.title, answer.scores)
    isAnswerEmpty.value = false
}
const messages = useMessages()
const sendAnswer = () => {
    if(!isAnswerEmpty.value) {
        messages.value.push(new TextMessage("user", selectedAnswer.value.title, getMessageTime()))
        ++questionNumber.value
        setQuestion()
        isAnswerEmpty.value = true
    }
}
</script>