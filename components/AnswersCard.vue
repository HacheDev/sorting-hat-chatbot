<template>
    <Transition name="answers-card">
        <div v-if="!isNameChosen" class="name-input-container">
            <!-- <Transition name="name-container"> -->
                    <input class="name-input" v-if="!pending" v-model="userName" type="text" :placeholder="placeholders.name" @keypress.enter="saveUserName()" tabindex="1" >
                <button class="name-submit" 
                    @click="saveUserName()" 
                    @keypress.enter="saveUserName()"
                ><i class="icon icon-circle-right"></i>
                <span class="submit-button-text">{{ placeholders.send }}</span>
                </button>
            <!-- </Transition> -->
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
                    <i class="icon icon-circle-right"></i>
                    <span class="submit-button-text">{{ placeholders.send }}</span>
                </button>
            </div>
            <Transition name="answers">
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
            </Transition>
        </div>
    </Transition>
</template>

<style lang="less" scoped>
.answers-card-enter-active,
.answers-card-leave-active   {
    transition: all 1s ease;
}
.answers-card-enter-from,
.answers-card-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.answers-card-leave-active    {
    position: absolute;
}
.name-input-container   {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    font-size: 1.5rem;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    background-color: @darkest-navy-blue;
    .name-container-enter-active,
    .name-container-leave-active   {
        transition: all 1s ease;
    }
    .name-container-enter-from,
    .name-container-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    .name-container-leave-active    {
        position: absolute;
    }
    .name-input {
        border-radius: 9999px;
        height: auto;
        text-align: center;
        font-size: inherit;
        width: 80vw;
    }
    .name-submit    {
        display: flex;
        align-items: center;
        text-transform: capitalize;
        border-radius: 9999px;
        font-size: 2rem;
        height: auto;
        cursor: pointer;
        background-color: @light-blue;
        border: none;
        color: white;
        padding-left: 0;
        transition: all 1s ease;
        box-shadow: 5px 5px 0px 2px rgba(0,0,0,0.75);
        &:hover {
            background-color: @navy-blue;
            transform: translateX(5px) translateY(5px);
            box-shadow: none;
        }
        .icon  {
            &::before   {
                font-size: 3rem;
                border-top-left-radius: 9999px;
                border-bottom-left-radius: 9999px;
                padding-right: 15px;
            }
        }
    }
}

.answers-container  {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    font-size: 1.5rem;
    background-color: @darkest-navy-blue;
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
            display: flex;
            align-items: center;
            font-size: 2rem;
            text-transform: capitalize;
            height: fit-content;
            border-radius: 9999px;
            cursor: pointer;
            background-color: @light-blue;
            border: none;
            color: white;
            transition: all 1s ease;
            padding-left: 0;
            box-shadow: 5px 5px 0px 2px rgba(0,0,0,0.75);
            &:hover {
                background-color: @navy-blue;
                transform: translateX(5px) translateY(5px);
                box-shadow: none;
            }
            .icon  {
                &::before   {
                    background-color: transparent;
                    font-size: 3rem;
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
            transition: all 1s ease-in;
            box-shadow: 5px 5px 0px 2px rgba(0,0,0,0.75);
            &:hover {
                background-color: @light-blue;
                transform: translateX(5px) translateY(5px);
                box-shadow: none;
            }
        }
    }
    .answers-enter-active,
    .answers-leave-active   {
        transition: all 1s ease;
    }
    .answers-enter-from,
    .answers-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
    .answers-leave-active    {
        position: absolute;
    }
}

@media @mobile  {
    .name-input-container   {
        .name-submit    {
            width: 48px;
            padding: 0;
            .icon::before   {
                padding-right: 0;
            }
            .submit-button-text {
                display: none;
            }
        }
    }

    .answers-container  {
        .answer-submit  {
            width: 48px;
            padding: 0;
            .submit-button-text {
                display: none;
            }
        }
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