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
    position: fixed;
    bottom: 5vh;
    display: flex;
    width: 100%;
    font-size: 1.5rem;
    justify-content: space-around;
    align-items: center;
    background-color: @primary-color;
    .name-input {
        border-radius: 9999px;
        height: auto;
        text-align: center;
        font-size: inherit;
        width: 80vw;
    }
    .name-submit    {
        border-radius: 9999px;
        height: auto;
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
    position: fixed;
    bottom: 5vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    // padding: 10px 0 10px 10px;
    font-size: 1.5rem;
    background-color: @primary-color;
    .answer-selection   {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: auto;
        min-width: 50%;
        width: fit-content;
        .selected-answer   {
            display: inline-flex;
            color: black;
            background-color: white;
            justify-content: space-around;
            width: fit-content;
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
        overflow-y: scroll;
        height: 25vh;
        align-items: center;
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
            min-width: 30%;
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
                background-color: @submit-color;
            }
        }
    }
}

@media @mobile  {
    .name-input-container   {
        bottom: 0;
    }
    .answers-container  {
        bottom: 0;
    }
}

@media @tablet  {
    .name-input-container   {
        bottom: 0;
    }
    .answers-container  {
        bottom: 0;
    }
}

@media @laptop  {
    .name-input-container   {
        bottom: 0;
    }
    .answers-container  {
        bottom: 0;
    }
}
</style>

<script lang="ts" setup>
import { selectAnswer, sendAnswer, saveUserName } from '~~/composables/functions';
import { useIsNameChosen, useUserName } from '~~/composables/states';
import Answer from '~~/utils/classes/Answer';

// load correct placeholders
const currentLocale = useLocale()
const { pending, data: placeholders } = await useAsyncData(() =>   queryContent(currentLocale.value + "/placeholders").findOne())

// get states from composables
const isAnswerEmpty = useIsAnswerEmpty()
const isNameChosen = useIsNameChosen()
const userName = useUserName()
const selectedAnswer = useSelectedAnswer()
const questionsLoaded = useQuestionsLoaded()
const currentQuestion = useCurrentQuestion()

// placeholder for selected answer
selectedAnswer.value = placeholders.value.answer

// compute available answers of current question
const currentAnswers = computed<Answer[]>(() =>  currentQuestion.value.answers)

// compute number of messages, answers are available after user name message
const numOfMessages = computed<number>(() => useMessages().value.length)
</script>