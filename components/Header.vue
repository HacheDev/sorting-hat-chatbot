<template>
    
    <header class="main-header">
        <h1 class="main-title" v-if="!pending && webName">{{ webName.title }}</h1>
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
    z-index: 10;
    .main-title {
        margin: auto;
    }

}
</style>

<script lang="ts" setup>
const { locale } = useI18n()

const { pending, data: webName } = await useAsyncData("webName", () =>  queryContent(locale.value + "/web-info").only(["title"]).findOne())

// let botName: string
// watch(pending, (newPending) =>  {
//     if(!newPending) {
//         botName = chatName.value.bot
//     }
// })

</script>