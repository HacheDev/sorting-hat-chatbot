<template>
    <div class="chat-container">
        <ChatHeader></ChatHeader>
        <div class="chat">
            <div class="chat-content" v-if="!messages"></div>
            <div class="chat-content" v-else>
                <TransitionGroup name="message" 
                @enter="scrollToMessage()">
                    <Message 
                        v-for="(message, index) in messages" 
                        :key="message.content" 
                        :isBotMessage="message.owner == 'bot'"
                        :id="`message--${index}`"
                        >
                        <template #text>
                            {{ message.content }}
                        </template>
                        <template #time>
                            {{ message.time }}
                        </template>
                        
                    </Message>
                </TransitionGroup>
            </div>
        </div>
        <AnswersCard v-if="!hasFinished"></AnswersCard>
        <ResultsCard v-else></ResultsCard>
    </div>
</template>

<style lang="less" scoped>
.chat-container {
    height: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    .chat   {    
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-start;
        height: 55vh;
        .chat-content {
            display: flex;
            flex-direction: column;
            height: 50vh;
            scroll-behavior: smooth;
            overflow-y: scroll;
            padding-bottom: 20px;
            .message-enter-active,
            .message-leave-active   {
                transition: all 1s ease;
            }
            .message-enter-from,
            .message-leave-to {
                opacity: 0;
                transform: translateY(30px);
            }
            .message-leave-active   {
                position: absolute;
            }
            
        }
    }
}

@media @mobile  {
    .chat-container {
        .chat {
            height: 45vh;
            .chat-content   {
                padding-bottom: 0;
            }
        }
    }
}
</style>

<script lang="ts" setup>
import { useQuestionsList } from "~~/composables/states";
import { scrollToMessage } from '~~/composables/functions';

// load questions from content module with correct lang
const currentLocale = useLocale()
const { pending, data: questions } = await useAsyncData(() =>   queryContent(currentLocale.value + "/questions").findOne())
const questionsList = useQuestionsList()
const questionsLoaded = useQuestionsLoaded()
const messages = useMessages()
const questionNumber = useQuestionNumber()

// create a watcher over questionList state
// when questionsList has been assigned a value
// questionsLoaded state becomes true
watch(questionsList, (newQuestions) =>  {
    questionsLoaded.value = true
})
// assign a value to questionsList state
questionsList.value = questions.value.body

// start chatting
sendNameQuestion(1500)

// check if all questions have been answered
const hasFinished = computed<boolean>(() => questionsList.value.length <= questionNumber.value)

    
</script>