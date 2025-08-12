<script setup lang="ts">
const appConfig = useAppConfig()
const navigation = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
]
</script>

<template>
  <nav
    class="bg-omr-violet-medium border-omr-violet-dark/20 dark:bg-dt-surface-base dark:text-dt-text-main dark:border-omr-violet-dark/40 border-b text-gray-900 shadow-sm"
  >
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <!-- Navigation -->
      <div class="space-x-6">
        <NuxtLink
          v-for="link in navigation"
          :key="link.path"
          :to="link.path"
          class="dark:text-dt-text-main text-gray-900 underline-offset-4 opacity-90 hover:underline hover:opacity-100"
          active-class="font-semibold"
        >
          {{ link.title }}
        </NuxtLink>
      </div>
      <!-- Color Mode Toggle removed: forced dark theme -->
    </div>
  </nav>
</template>
