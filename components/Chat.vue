<template>
    <div class="chat-header">Sorting Hat</div>
    <div class="chat-container">
        <div v-if="pending">loading...</div>
        <div v-else>
            <Message v-for="message in messages" :key="message.content" :isBotMessage="message.owner == 'bot'">
                {{ message.content }}   {{ message.time }}
            </Message>
        </div>
    </div>
</template>

<style lang="less" scoped>
.chat-container {
    
}
</style>

<script lang="ts" setup>

import { TextMessageInterface } from "~~/utils/interfaces/chat/TextMessageInterface";
import TextMessage from "~~/utils/classes/chat/TextMessage";
// import { Question } from "~~/utils/interfaces/chat/QuestionInterface"
const getMessageTime = (): string => {
    const currentDate = new Date()
    return currentDate.getHours() + ":" + (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()
}

const questionNumber = useState<number>("questionNumber", () => 0)
const { pending, data: questions } = await useAsyncData("questions", () =>  queryContent(useState("localeState").value + "/questions").findOne())
const messages = useState<TextMessage[]>("Textmessages", () => [new TextMessage("bot", questions.value.body[0].title, getMessageTime()), new TextMessage("user", questions.value.body[1].title, getMessageTime())])

// console.log(messages[0])
// console.log(messages[1])
// console.log(getMessageTime())
</script>