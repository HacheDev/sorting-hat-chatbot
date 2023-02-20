<template>
    <div v-if="!isNameChosen" class="name-input-container">
        <input v-model="userName" type="text" placeholder="write your name">
        <button @click="saveUserName()" >Choose</button>
    </div>
    <div v-else class="answers-container">
        <span v-if="!isAnswerEmpty && selectedAnswer.title">{{ selectedAnswer.title }}</span>
        <!-- <span v-else-if="!pending && defaultAnswer">{{ defaultAnswer["title"] }}</span> -->
        <button @click="sendAnswer()">send</button>
        <div v-if="questionsLoaded && currentAnswers" class="answers-container">
            <button v-for="answer in currentAnswers" :key="answer.title" @click="selectAnswer(answer)">{{ answer.title }}</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ComputedRef } from '@vue/reactivity';
import { selectAnswer, sendAnswer, saveUserName } from '~~/composables/functions';
import { useIsNameChosen, useUserName } from '~~/composables/states';
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
const isNameChosen = useIsNameChosen()
const userName = useUserName()

const currentAnswers = computed<Answer[]>(() =>  currentQuestion.value.answers)

</script>