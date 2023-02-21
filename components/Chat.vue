<template>
    <div class="chat-container">
        <ChatHeader></ChatHeader>
        <div class="chat">
            <div class="chat-content" v-if="!messages">loading...</div>
            <div class="chat-content" v-else>
                <TransitionGroup name="message">
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
            .message-leave-active   {
                position: absolute;
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
const locale = useLocale()
const { pending, data: questions } = await useAsyncData(() =>   queryContent(locale.value + "/questions").findOne())
const questionsList = useQuestionsList()
const questionsLoaded = useQuestionsLoaded()
const messages = useMessages()
const messageNumber = useMessageNumber()

watch(questionsList, (newQuestions) =>  {
    questionsLoaded.value = true
})
questionsList.value = questions.value.body

const messageId: string = "message--" + messageNumber.value

// watch(messageNumber, (newMessageNumber) =>    {
//     const messageElement = document.getElementById("message--" + newMessageNumber)
//     if(messageElement)  {
//         messageElement.scrollIntoView({behavior: "smooth"})
//     }
//     ++messageNumber.value
// })
sendNameQuestion(1000)

// const messageRefs = ref([])

// onMounted(() => {
//     const messageElement = document.getElementById(messageRefs.value[0])
//     if(messageElement)  {
//         messageElement.scrollIntoView({behavior: "smooth"})
//     }
// })
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