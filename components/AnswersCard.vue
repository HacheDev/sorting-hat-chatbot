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
import { selectAnswer, sendAnswer } from '~~/composables/functions';
import Answer from '~~/utils/classes/Answer';
import Question from '~~/utils/classes/Question';
import TextMessage from '~~/utils/classes/TextMessage';
import { getMessageTime } from '~~/utils/functions/getMessageTime';

const isAnswerEmpty = useIsAnswerEmpty()
const selectedAnswer = useSelectedAnswer()
const questionsLoaded = useQuestionsLoaded()
const questionsList = useQuestionsList()
const questionNumber = useQuestionNumber()
const currentQuestion = useCurrentQuestion()
const messages = useMessages()

const currentAnswers = computed<Answer[]>(() =>  currentQuestion.value.answers)

</script>