<template>
    <div class="message">
        <slot class="message-content"></slot>
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
        width: 100%;
        position: fixed;

    }
}
</style>

<script setup lang="ts">
// const props = defineProps({
//     isSent: { 
//         type: Boolean,
//         required: true
//     }
// })
// const messageType = useState<string>("messageType", () =>   {
//     return props.isSent ? "sent" : "received"
// })


</script>