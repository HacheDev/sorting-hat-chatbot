<template>
  <NuxtLayout>
    <Chat></Chat>
    <AnswersCard></AnswersCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  useHead({
    bodyAttrs:  {
      class: "custom-body"
    }
  })
  const { locale } = useI18n()
  console.log(locale)
  const localeState = useState<string>("localeState", () => locale)
</script>
