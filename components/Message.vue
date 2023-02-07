<template>
    <div class="message">
        <div class="message-content"></div>
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
        &.send  {
            justify-content: flex-end;
        }
    }
}
</style>