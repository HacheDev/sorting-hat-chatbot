<template>
    <div class="chat-container">
        <ChatHeader></ChatHeader>
        <div class="chat">
            <div class="chat-content" v-if="!messages">loading...</div>
            <div class="chat-content" v-else>
                <TransitionGroup name="message">
                    <Message v-for="message in messages" :key="message.content" :isBotMessage="message.owner == 'bot'">
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
        <AnswersCard class="answers-card"></AnswersCard>
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
                transform: translateX(30px);
            }
            
        }
    }
    .answers-card   {
        justify-content: flex-end;
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
import TextMessage from "~~/utils/classes/TextMessage";
import { getMessageTime } from "~~/utils/functions/getMessageTime";
const { locale } = useI18n()

const { data: nameQuestion } = await useAsyncData(() => queryContent(locale.value + "/name-question").findOne())
const { pending, data: questions } = await useAsyncData(() =>   queryContent(locale.value + "/questions").findOne())
const questionsList = useQuestionsList()
const questionsLoaded = useQuestionsLoaded()
questionsList.value = questions.value.body
watch(questionsList, (newQuestions) =>  {
    questionsLoaded.value = true
})

const questionNumber = useQuestionNumber()
const messages = useMessages()
const isBotTurn = useIsBotTurn()
const currentQuestion = useCurrentQuestion()
currentQuestion.value = useQuestionsList().value[useQuestionNumber().value]
messages.value = [new TextMessage("bot", nameQuestion.value.title, getMessageTime())]
isBotTurn.value = false
// setTimeout(() =>    currentQuestion.value = useQuestionsList().value[useQuestionNumber().value]
// , 1000)

// const { pending, data: questions } = await useAsyncData("questions", async() =>  {
//     const {pending,data:response} = await useAsyncData(() => queryContent(useState("localeState").value + "/questions").findOne())
//     currentQuestion.value = response.value.body[useQuestionNumber().value]
// })
// const currentQuestion = useState<Question>("currentQuestion")
// const currentQuestion = computed((): Question =>  {
//     return new Question(questions.value.body[questionNumber.value].title, questions.value.body[questionNumber.value].answers)
// })
// const messages = useState<TextMessage[]>("textMessages", () => [new TextMessage("bot", questions.value.body[0].title, getMessageTime()), new TextMessage("user", questions.value.body[1].title, getMessageTime())])
// const currentScore = useState<

// console.log(messages[0])
// console.log(messages[1])
// console.log(getMessageTime())
</script>