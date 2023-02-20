<template>
    <header class="chat-header">
        <nuxt-img class="chat-header-bot-icon" src="/sorting-hat.jpg"></nuxt-img>
        <div class="header-info">
            <h2 v-if="!pending && botName" class="chat-header-title">{{ botName.bot }}</h2>
            <h3 class="bot-status">{{ botStatus }}</h3>
        </div>
    </header>
</template>

<style lang="less" scoped>
.chat-header    {
    position: relative;
    display: flex;
    background-color: @primary-color;
    // font-size: 2.5rem;
    padding: 30px 0;
    align-items: center;
    justify-content: flex-start;
    color: white;
    text-transform: capitalize;
    z-index: 20;
    height: 5vh;

    &::after   {
        content: "";
        height: 40%;
        width: 100%;
        position: absolute;
        z-index: 10;
        top: 100%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0)) repeat-x;
    }
    .chat-header-bot-icon  {
        max-width: 5rem;
        max-height: 5rem;
        border-radius: 50%;
        margin: 0 40px;
    }
    .header-info    {
        display: grid;
        
        .chat-header-title {
            margin: 0;
        }
        .bot-status {
            margin: 0;
        }
    }
    
}

</style>

<script lang="ts" setup>
const { locale } = useI18n()

const { pending, data: botName } = await useAsyncData("chatNames", () =>  queryContent(locale.value + "/chat-names").only(["bot"]).findOne())

const botStatus = computed(():string => useIsBotTurn().value ? "writing..." : "online")


</script>