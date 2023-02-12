<template>
    <div class="message" :class="messageType">
        <slot class="message-content"></slot>
    </div>
</template>

<style lang="less" scoped>
.message    {
    display: flex;
    margin: auto;
    .message-content    {
        display: flex;
        width: 100%;
        position: fixed;
        &.received  {
            justify-content: flex-start;
        }
        &.sent  {
            justify-content: flex-end;
        }
    }
}
</style>

<script setup lang="ts">
const props = defineProps({
    isSent: { 
        type: Boolean,
        required: true
    }
})
const messageType = useState<string>("messageType", () =>   {
    return props.isSent ? "sent" : "received"
})


</script>