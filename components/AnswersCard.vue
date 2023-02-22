<template>
    <div v-if="!isNameChosen" class="name-input-container">
        <input class="name-input" v-if="!pending" v-model="userName" type="text" :placeholder="placeholders.name" @keypress.enter="saveUserName()" tabindex="1" >
        <button class="name-submit" @click="saveUserName()" @keypress.enter="saveUserName()">
            <i class="fa-solid fa-circle-chevron-right"></i>
        </button>
    </div>
    <div v-else class="answers-container">
        <div class="answer-selection">
            <span class="selected-answer" 
                v-if="!isAnswerEmpty && selectedAnswer.title"
                >{{ selectedAnswer.title }}
            </span>
            <span class="selected-answer"
                v-else-if="!pending && isAnswerEmpty"
                >{{ placeholders.answer }}
            </span>
            <button class="answer-submit" 
                @click="sendAnswer()" 
            >
                <i class="fa-solid fa-circle-chevron-right"></i>

            </button>
        </div>
        <div v-if="questionsLoaded && currentAnswers && numOfMessages > 2" class="answers">
            <TransitionGroup name="answer">
                <button class="answer" 
                    v-for="answer in currentAnswers" 
                    :key="answer.title" 
                    @click="selectAnswer(answer)"
                >{{ answer.title }}
                </button>
            </TransitionGroup>
        </div>
    </div>
</template>

<style lang="less" scoped>
.name-input-container   {
    display: flex;
    width: 100%;
    font-size: 1.5rem;
    justify-content: space-around;
    align-items: center;
    // height: calc(100% - 55vh);
    background-color: @primary-color;
    .name-input {
        border-radius: 9999px;
        height: 30px;
        width: 90%;
        text-align: center;
        font-size: inherit;
    }
    .name-submit    {
        border-radius: 9999px;
        width: 5%;
        height: fit-content;
        cursor: pointer;
        background-color: transparent;
        border: none;
        color: @submit-color;
        .fa-solid  {
            background-color: transparent;
            &::before   {
                background-color: transparent;
                font-size: 6rem;
                line-height: 70px;
            }
        }
    }
}

.answers-container  {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 10px 0 10px 10px;
    // height: calc(100% - 55vh);
    font-size: 1.5rem;
    background-color: @primary-color;
    .answer-selection   {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: auto;
        .selected-answer   {
            display: inline-flex;
            color: black;
            background-color: white;
            justify-content: space-around;
            width: 80vw;
            text-align: center;
            border-radius: 9999px;
            border: 1px solid gray;
            align-items: center;
            padding: 10px;
            flex: 1;
            height: auto;
            margin: 5px auto;
            font-size: inherit;
        }
        .answer-submit  {
            height: fit-content;
            width: calc(100% - 80vw);
            border-radius: 9999px;
            cursor: pointer;
            background-color: transparent;
            border: none;
            color: @submit-color;
            .fa-solid  {
                background-color: transparent;
                &::before   {
                    background-color: transparent;
                    font-size: 6rem;
                    line-height: 70px;
                }
            }
        }
    }
    .answers  {
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        height: 25vh;
        .answer-enter-active,
        .answer-leave-active   {
            transition: all 1s ease;
        }
        .answer-enter-from,
        .answer-leave-to {
            opacity: 0;
            transform: translateX(30px);
        }
        .answer-leave-active    {
            position: absolute;
        }
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
            cursor: pointer;
            &:hover  {
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                transform: translateY(-5px);
            }
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

const currentLocale = useLocale()
const { pending, data: placeholders } = await useAsyncData(() =>   queryContent(currentLocale.value + "/placeholders").findOne())
const isAnswerEmpty = useIsAnswerEmpty()
const isNameChosen = useIsNameChosen()
const userName = useUserName()
const selectedAnswer = useSelectedAnswer()
selectedAnswer.value = placeholders.value.answer
const questionsLoaded = useQuestionsLoaded()
const currentQuestion = useCurrentQuestion()

//compute current answer from current question
const currentAnswers = computed<Answer[]>(() =>  currentQuestion.value.answers)
const numOfMessages = computed<number>(() => useMessages().value.length)
</script>