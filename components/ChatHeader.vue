<template>
    <header class="chat-header">
        <img class="chat-header-bot-icon" src="/images/sorting-hat.jpg">
        <div class="chat-header-info">
            <h2 v-if="!pending && chatInfo" class="chat-header-title">{{ chatInfo.bot }}</h2>
            <h3 class="bot-status">{{ botStatus }}</h3>
        </div>
        <LangSwitcher></LangSwitcher>
    </header>
</template>

<style lang="less" scoped>
.chat-header    {
    position: relative;
    display: flex;
    background-color: @darkest-navy-blue;
    padding: 30px 0;
    align-items: center;
    justify-content: flex-start;
    color: white;
    text-transform: capitalize;
    height: 5vh;

    &::after   {
        content: "";
        height: 40%;
        width: 100%;
        position: absolute;
        z-index: 1;
        top: 100%;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0)) repeat-x;
    }
    .chat-header-bot-icon  {
        max-width: 5rem;
        max-height: 5rem;
        border-radius: 50%;
        margin: 0 40px;
    }
    .chat-header-info    {
        display: grid;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        width: 70vw;
        .chat-header-title {
            margin: 0;
            font-size: 3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .bot-status {
            margin: 0;
            font-family: 'DumbledorItalic';
            font-size: 2rem;
        }
    }
}

@media @mobile  {
    .chat-header{
        .chat-header-bot-icon   {
            display: none;
        }
        .chat-header-info   {
            padding-left: 20px;
            width: 50vw;
            .chat-header-title  {
                font-size: 2rem;
            }
            .bot-status {
                font-size: 1.5rem;
            }
        }
    }
}

@media @tablet  {
    .chat-header    {
        .chat-header-bot-icon   {
            display: none;
        }
    }
}

</style>

<script lang="ts" setup>
// load info of the header
const currentLocale = useLocale()
const { pending, data: chatInfo } = await useAsyncData("chatInfo", () =>  queryContent(currentLocale.value + "/chat-info").findOne())

// computed value from isBotTurn state
const botStatus = computed(():string => useIsBotTurn().value ? chatInfo.value.writing : chatInfo.value.online)

</script>