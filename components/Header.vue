<template>
    
    <header class="main-header">
        <nuxt-img class="user-icon" src="/sorting-hat.jpg"></nuxt-img>
        {{ botName }}
    </header>
</template>

<style lang="less" scoped>

.main-header    {
    display: flex;
    background-color: @primary-color;
    font-size: 2.5rem;
    padding: 30px 0;
    align-items: center;
    justify-content: flex-start;
    color: white;
    text-transform: capitalize;
    .user-icon  {
        max-width: 5rem;
        max-height: 5rem;
        border-radius: 50%;
        margin: 0 40px;
    }
}
</style>

<script lang="ts" setup>
const { pending, data: chatName } = await useAsyncData("chatNames", () =>  queryContent(useState("localeState").value + "/chat-names").only(["bot"]).findOne())
const botName: string = chatName.value.bot

</script>