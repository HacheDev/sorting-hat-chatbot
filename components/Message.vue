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
    display: flex;
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
        // border: 1px solid white;
        border-bottom: 1px solid white;
        border-right: 1px solid white;
        border-left: 1px solid white;
        border-radius: 5%;
        // overflow: hidden;
        position: relative;
        .message-owner  {
            background-color: @primary-color;
            padding: 5px 10px;
            margin: 0;
            // border-top-left-radius: 10%;
            // border-top-right-radius: 10%;
            // border-top: 1px solid white;
            // border-right: 1px solid white;
            // border-left: 1px solid white;
        }
        .message-content    {
            padding: 5px 10px;
            // border: 1px solid white;
            // border-bottom-left-radius: 10%;
            // border-bottom-right-radius: 10%;
            .message-time   {
                margin-top: 5px;
                font-size: 0.75rem;
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
                    top: 50%;
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
                    top: 50%;
                    left: 100%;
                    .triangle(white, 10, right);
                }
            }
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

const { pending, data: chatNames } = await useAsyncData("chatNames", () =>  queryContent(useCurrentLocale().value + "/chat-names").findOne())
const messageOwnerName: string = props.isBotMessage ? chatNames.value.bot : chatNames.value.user


</script>