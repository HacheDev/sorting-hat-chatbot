<template>
    <div class="message-row" :class="messageType">
        <nuxt-img class="user-icon" v-if="props.isBotMessage == true" src="/sorting-hat.jpg"></nuxt-img>
        <div class="message">
            <h3 class="message-owner">{{ messageOwnerName }}</h3>
            <div class="message-content">
                <slot name="text" class="message-text"></slot>
                <span class="message-time">
                    <slot name="time"></slot>
                </span>
                <!-- <span>{{ currentQuestion }}</span> -->
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@import "@/assets/less/mixins.less";

.message-row    {
    display: inline-flex;
    margin: auto;
    align-items: center;
    margin: 10px;

    .user-icon  {
        max-width: 4rem;
        max-height: 4rem;
        border-radius: 50%;
    }
    .message    {
        display: flex;
        flex-direction: column;
        border: 1px solid white;
        border-radius: 9999px;
        position: relative;
        padding: 20px;
        .message-owner  {
            padding: 5px 10px;
            margin: 0;
            // font-family: 'DumbledorOutline';
            font-family: 'DumbledorItalic';
            font-size: 1.75rem;
        }
        .message-content    {
            padding: 5px 10px;
            font-size: 1.5rem;
            
            .message-time   {
                margin-top: 5px;
                font-size: 1rem;
                font-family: 'DumbledorItalic';
            }
        }
    }
    &.received  {
        justify-content: flex-start;
        .message    {
            background-color: @bot-message-color;
            margin-left: 40px;
            .message-content    {
                .message-text   {
                
                }
                .message-time   {
                    display: flex;
                    justify-content: flex-end;
                }
                &::before    {
                    content: '';
                    position: absolute;
                    top: 40%;
                    right: 100%;
                    .triangle(white, 10, left);
                }
            }
        }
    }
    &.sent  {
        justify-content: flex-end;
        .message    {
            margin-right: 40px;
            background-color: @user-message-color;
            .message-content    {
                .message-text   {
                
                }
                .message-time   {
                    display: flex;
                    justify-content: flex-start;
                }
                &::before    {
                    content: '';
                    position: absolute;
                    top: 40%;
                    left: 100%;
                    .triangle(white, 10, right);
                }
            }
        }
    }

}

@media @mobile  {
    .message-row    {
        .message    {
            padding: 14.65%;
        }
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

const currentLocale = useLocale()
const messageNumber = useMessageNumber()
const { pending, data: chatNames } = await useAsyncData("chatNames", () =>  queryContent(currentLocale.value + "/chat-info").findOne())
const messageOwnerName: string = props.isBotMessage ? chatNames.value.bot : chatNames.value.user + " (" + useUserName().value + ")"

</script>