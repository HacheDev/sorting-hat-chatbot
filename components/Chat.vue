<template>
    <ChatHeader></ChatHeader>
    <div class="chat-container">
        <div v-if="!messages">loading...</div>
        <div v-else>
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
    <AnswersCard></AnswersCard>
</template>

<style lang="less" scoped>
.chat-container {
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
</style>

<script lang="ts" setup>
import { useCurrentLocale, useQuestionsList } from "~~/composables/states";
import Question from "~~/utils/classes/Question";
import TextMessage from "~~/utils/classes/TextMessage";
import { getMessageTime } from "~~/utils/functions/getMessageTime";

const { pending, data: questions } = await useAsyncData(() =>   queryContent(useCurrentLocale().value + "/questions").findOne())
const questionsList = useQuestionsList()
watch(questionsList, (newQuestions) =>  {
    questionsLoaded.value = true
})
questionsList.value = questions.value.body
const questionNumber = useQuestionNumber()
const messages = useMessages()
const currentQuestion = useCurrentQuestion()
const questionsLoaded = useQuestionsLoaded()
currentQuestion.value = useQuestionsList().value[useQuestionNumber().value]

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