<template>
  <NuxtLayout>
    <Chat></Chat>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useLocale } from './composables/states';

  useHead({
    bodyAttrs:  {
      class: "custom-body"
    }
  })
  const { locale } = useI18n()
  useLocale().value = locale.value
</script>
