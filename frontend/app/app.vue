<script setup lang="ts">
import { useAppConfig, useSeoMeta } from 'nuxt/app'

const { cover } = useAppConfig() as { cover?: string }

useSeoMeta({
  ogImage: cover ?? '',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="min-h-screen bg-(--color-dt-surface-base) text-(--color-dt-text-main) sm:pt-0 sm:pb-10 dark">
    <Html lang="en" />
    <NuxtLoadingIndicator />
    <AppNavbar />
    <NuxtPage />
  </div>
</template>
