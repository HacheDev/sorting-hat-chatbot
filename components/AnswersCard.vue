<template>
    <span v-if="!isAnswerEmpty">{{ selectedAnswer.title }}</span>
    <span v-else>{{ defaultAnswer["title"] }}</span>
    <button @click="sendAnswer()">send</button>
    <div class="answers-container">
        <button v-if="!pending" v-for="(answer, index) in answers" @click="selectAnswer(answer)">{{ answer.title }}</button>
    </div>
</template>

<script lang="ts" setup>
import { ComputedRef } from '@vue/reactivity';
import Answer from '~~/utils/classes/Answer';
import Question from '~~/utils/classes/Question';
import TextMessage from "~~/utils/classes/TextMessage";
import { getMessageTime } from '~~/utils/functions/getMessageTime';
import { AnswerInterface } from '~~/utils/interfaces/AnswerInterface';

const { pending, data: defaultAnswer } = await useAsyncData("default-answer", () =>  queryContent(useState("localeState").value + "/default-answer").findOne())

const isAnswerEmpty = useState<boolean>("isAnswerEmpty", () => true)
// let answerEmpty = isAnswerEmpty.value
const selectedAnswer = useState<Answer>("selectedAnswer")
console.log(selectedAnswer.value)
const questionNumber = useState<number>("questionNumber")
const currentQuestion = useState<Question>("currentQuestion")
const answers: ComputedRef<AnswerInterface[]> = computed(() =>    currentQuestion.value.answers)
// console.log(currentQuestion.value.answers[1].title)
const selectAnswer = (answer: Answer) => {
    selectedAnswer.value = new Answer(answer.title, answer.scores)
    isAnswerEmpty.value = false
}
const messages = useState<TextMessage[]>("textMessages")
const sendAnswer = () => {
    messages.value.push(new TextMessage("user", selectedAnswer.value.title, getMessageTime()))
    ++questionNumber.value
}
</script>