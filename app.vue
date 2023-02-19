<template>
  <NuxtLayout>
    <Chat></Chat>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useCurrentLocale } from './composables/states';

  useHead({
    bodyAttrs:  {
      class: "custom-body"
    }
  })
  const currentLocale = useCurrentLocale()
  const { locale } = useI18n()
  currentLocale.value = locale.value
</script>
