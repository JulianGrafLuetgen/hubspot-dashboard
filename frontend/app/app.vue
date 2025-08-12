<script setup lang="ts">
const { cover } = useAppConfig()

useSeoMeta({
  ogImage: cover,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900 dark:bg-(--color-dt-surface-base) dark:text-(--color-dt-text-main) sm:pt-0 sm:pb-10">
    <Html lang="en" />
    <NuxtLoadingIndicator />
    <AppNavbar />
    <NuxtPage />
  </div>
</template>
