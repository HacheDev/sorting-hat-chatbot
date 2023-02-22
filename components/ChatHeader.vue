<template>
    <header class="chat-header">
        <nuxt-img class="chat-header-bot-icon" src="/sorting-hat.jpg"></nuxt-img>
        <div class="chat-header-info">
            <h2 v-if="!pending && chatInfo" class="chat-header-title">{{ chatInfo.bot }}</h2>
            <h3 class="bot-status">{{ botStatus }}</h3>
        </div>
        <LangSwitcher></LangSwitcher>
        
        <!-- <nuxt-link :to="availableLocales[0]">{{ availableLocales[0] }}</nuxt-link> -->
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
    // z-index: 20;
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
        
        .chat-header-title {
            margin: 0;
            font-family: 'Dumbledor3D';
            font-size: 3rem;
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
            .chat-header-title  {
                
            }
        }
    }
}

</style>

<script lang="ts" setup>

const currentLocale = useLocale()

const { pending, data: chatInfo } = await useAsyncData("chatInfo", () =>  queryContent(currentLocale.value + "/chat-info").findOne())

const botStatus = computed(():string => useIsBotTurn().value ? chatInfo.value.writing : chatInfo.value.online)

</script>