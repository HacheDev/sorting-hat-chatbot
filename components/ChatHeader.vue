<template>
    <header class="chat-header">
        <nuxt-img class="chat-header-bot-icon" src="/sorting-hat.jpg"></nuxt-img>
        <h2 v-if="!pending && botName" class="chat-header-title">{{ botName.bot }}</h2>
    </header>
</template>

<style lang="less" scoped>
.chat-header    {
    display: flex;
    background-color: @primary-color;
    font-size: 2.5rem;
    padding: 30px 0;
    align-items: center;
    justify-content: flex-start;
    color: white;
    text-transform: capitalize;
    .chat-header-title {
        margin: 0;
    }
    .chat-header-bot-icon  {
        max-width: 5rem;
        max-height: 5rem;
        border-radius: 50%;
        margin: 0 40px;
    }
}

</style>

<script lang="ts" setup>
const { pending, data: botName } = await useAsyncData("chatNames", () =>  queryContent(useCurrentLocale().value + "/chat-names").only(["bot"]).findOne())


</script>