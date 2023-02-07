<template>
    <div class="chat-header">Sorting Hat</div>
    <div class="chat-container">
        <div class="chat-message-list" v-for="question in questions" :key="question.title">

        </div>
    </div>
</template>

<script lang="ts" setup>
import * as questions from "~/assets/sorting_hat.json"
let currentMessageIndex = useState<number>("currentMessageIndex", () => 0)



</script>