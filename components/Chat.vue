<template>
    <div class="chat-header">Sorting Hat</div>
    <div class="chat-container">
        <div v-if="pending">loading...</div>
        <div v-else>
            <Message v-for="message in messages" :key="message.content" :isSent="message.type == 'sent'">
                {{ message.content }}
            </Message>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { TextMessageInterface } from "~~/utils/interfaces/chat/TextMessageInterface";
import TextMessage from "~~/utils/classes/chat/TextMessage";
// import { Question } from "~~/utils/interfaces/chat/QuestionInterface"


const questionNumber = useState<number>("questionNumber", () => 0)
const { pending, data: questions } = await useAsyncData("questions", () =>  queryContent("/sorting_hat").findOne())
const messages: TextMessage[] = useState<TextMessage[]>("Textmessages", () => [new TextMessage("received", questions.value.body[0].title), new TextMessage("sent", questions.value.body[1].title)])

console.log(messages[0])
</script>