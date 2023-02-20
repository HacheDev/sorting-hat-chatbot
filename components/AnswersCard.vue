<template>
    <div v-if="!isNameChosen" class="name-input-container">
        <input class="name-input" v-if="!pending" v-model="userName" type="text" :placeholder="placeholders.name" @keypress.enter="saveUserName()" tabindex="1" >
        <button class="name-button" @click="saveUserName()">Choose</button>
    </div>
    <div v-else class="answers-container">
        <div class="answer-selection">
            <span class="selected-answer" v-if="!isAnswerEmpty && selectedAnswer.title">{{ selectedAnswer.title }}</span>
            <span class="selected-answer" v-else-if="!pending && isAnswerEmpty">{{ placeholders.answer }}</span>
            <!-- <span v-else-if="!pending && defaultAnswer">{{ defaultAnswer["title"] }}</span> -->
            <button class="answer-submit" @click="sendAnswer()">send</button>
        </div>
        <div v-if="questionsLoaded && currentAnswers" class="answers">
            <button class="answer" v-for="answer in currentAnswers" :key="answer.title" @click="selectAnswer(answer)">{{ answer.title }}</button>
        </div>
    </div>
</template>

<style lang="less" scoped>
.name-input-container   {
    display: flex;
    width: 100%;
    justify-content: space-around;
    .name-input {
        border-radius: 9999px;
        height: 30px;
        width: 80%;
        text-align: center;
    }
    .name-button    {
        border-radius: 9999px;
        width: 15%;
        height: 30px;
    }
}

.answers-container  {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    // margin: 10px;
    padding: 10px 0 10px 10px;
    height: 5%;
    font-size: 1rem;
    .answer-selection   {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .selected-answer   {
            display: inline-flex;
            justify-content: space-around;
            height: 30px;
            min-width: 80%;
            width: fit-content;
            text-align: center;
            border-radius: 9999px;
            border: 1px solid gray;
            align-items: center;
        }
        .answer-submit  {
            height: 30px;
            width: 15%;
            border-radius: 9999px;
            font-size: inherit;
        }
    }
    .answers  {
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        height: 20vh;
        // padding: 10px 30px;
        // justify-content: space-around;
        // margin: 0 10px;
        .answer {
            display: inline-flex;
            flex: 1;
            min-width: 100%;
            width: fit-content;
            align-items: center;
            justify-content: center;
            height: auto;
            border-radius: 9999px;
            margin: 5px auto;
            font-size: inherit;
        }
    }
}

@media @mobile  {
    .answers-container  {
        .answers   {
            height: 30vh;
        }
    }
}
</style>

<script lang="ts" setup>
import { selectAnswer, sendAnswer, saveUserName } from '~~/composables/functions';
import { useIsNameChosen, useUserName } from '~~/composables/states';
import Answer from '~~/utils/classes/Answer';
import TextMessage from '~~/utils/classes/TextMessage';
import { getMessageTime } from '~~/utils/functions/getMessageTime';

const { locale } = useI18n()

const { data: defaultUserName } = await useAsyncData("defaultUserName", () =>  queryContent(locale.value + "/chat-names").only(["defaultUserName"]).findOne())

const { pending, data: placeholders } = await useAsyncData(() =>   queryContent(locale.value + "/placeholders").findOne())
// await sendNameQuestion(1000)
const isAnswerEmpty = useIsAnswerEmpty()
const selectedAnswer = useSelectedAnswer()
selectedAnswer.value = placeholders.value.answer
const questionsLoaded = useQuestionsLoaded()
// const questionsList = useQuestionsList()
const currentQuestion = useCurrentQuestion()
// currentQuestion.value = questionsList.value[useQuestionNumber().value]

const isNameChosen = useIsNameChosen()
const userName = useUserName()

const saveUserName = () =>   {
    const messages = useMessages()
    const userName = useUserName()
    if(!userName.value)    {
        userName.value = defaultUserName.value.defaultUserName
    }
    messages.value.push(new TextMessage("user", userName.value, getMessageTime()))
    useIsNameChosen().value = true
    // await sendBotMessage(1000)
}


const currentAnswers = computed<Answer[]>(() =>  currentQuestion.value.answers)

</script>