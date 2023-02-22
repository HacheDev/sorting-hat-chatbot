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
    </div>
</template>

<style lang="less" scoped>
.chat-container {
    height: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    // max-height: 30%;
    // overflow-y: auto;
    .chat   {    
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-start;
        // max-height: 400px;
        .chat-content {
            display: flex;
            flex-direction: column;
            // max-height: 10%;
            height: 50vh;
            scroll-behavior: smooth;
            overflow-y: auto;
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
            .chat-content   {
                // height: 60vh;
            }
        }
    }
}
</style>

<script lang="ts" setup>
import { useQuestionsList } from "~~/composables/states";
import { scrollToMessage } from '~~/composables/functions';

const currentLocale = useLocale()
const { pending, data: questions } = await useAsyncData(() =>   queryContent(currentLocale.value + "/questions").findOne())
const questionsList = useQuestionsList()
const questionsLoaded = useQuestionsLoaded()
const messages = useMessages()
const questionNumber = useQuestionNumber()

watch(questionsList, (newQuestions) =>  {
    questionsLoaded.value = true
})
questionsList.value = questions.value.body

sendNameQuestion(1500)


const hasFinished = computed<boolean>(() => questionsList.value.length <= questionNumber.value)

    
</script>