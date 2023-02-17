<template>
    <div class="chat-container">
        <div v-if="pending">loading...</div>
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
import Question from "~~/utils/classes/Question";
import TextMessage from "~~/utils/classes/TextMessage";
import { getMessageTime } from "~~/utils/functions/getMessageTime";

const questionNumber = useState<number>("questionNumber", () => 0)
const { pending, data: questions } = await useAsyncData("questions", () =>  queryContent(useState("localeState").value + "/questions").findOne())
const currentQuestion = useState<Question>("currentQuestion", () => new Question(questions.value.body[questionNumber.value].title, questions.value.body[questionNumber.value].answers))
// const currentQuestion = computed((): Question =>  {
//     return new Question(questions.value.body[questionNumber.value].title, questions.value.body[questionNumber.value].answers)
// })
const messages = useState<TextMessage[]>("textMessages", () => [new TextMessage("bot", questions.value.body[0].title, getMessageTime()), new TextMessage("user", questions.value.body[1].title, getMessageTime())])
// const currentScore = useState<

// console.log(messages[0])
// console.log(messages[1])
// console.log(getMessageTime())
</script>