<template>
    <div class="message" :class="messageType">
        <nuxt-img v-if="props.isBotMessage == true" src="/sorting-hat.jpg"></nuxt-img>
        <div class="message-content">
            <h3>{{ messageOwnerName }}</h3>
            <slot class="message-text"></slot>
        </div>
    </div>
</template>

<style lang="less" scoped>
.message    {
    display: flex;
    margin: auto;
    &.received  {
        justify-content: flex-start;
    }
    &.sent  {
        justify-content: flex-end;
    }
    .message-content    {
        display: flex;
        flex-direction: column;
    }
}
</style>

<script setup lang="ts">
const props = defineProps({
    isBotMessage: { 
        type: Boolean,
        required: true
    }
})
const messageType: string = props.isBotMessage ? "received" : "sent"

const { pending, data: chatNames } = await useAsyncData("chatNames", () =>  queryContent(useState("localeState").value + "/chat-names").findOne())
const messageOwnerName: string = props.isBotMessage ? chatNames.value.bot : chatNames.value.user
console.log(messageOwnerName)


// console.log(messageType)

</script>