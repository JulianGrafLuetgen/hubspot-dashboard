<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '#imports'

useHead({ title: 'HubSpot Insights Dashboard' })

const selectedFilters = ref<string[]>([])

// Placeholder fetch trigger when filters change (to be wired later)
function onApplyFilters(newFilters: string[]) {
  selectedFilters.value = [...newFilters]
}
</script>

<template>
  <section class="container mx-auto space-y-8 px-4 py-8">
    <h1
      class="text-3xl font-semibold tracking-tight"
    >
      HubSpot Marketing Hub – Insights
    </h1>

    <div
      class="border-omr-violet-light/30 dark:bg-dt-surface-base rounded-lg border bg-white/80 p-4 shadow-sm dark:border-gray-800"
    >
      <h2
        class="text-quarters-dark dark:text-dt-text-subtle mb-2 text-lg font-medium"
      >
        Filter Bar
      </h2>
      <div class="flex flex-wrap gap-2">
        <button
          class="bg-omr-teal-medium hover:bg-omr-teal-dark dark:bg-dt-primary-subtle dark:text-dt-text-main dark:hover:bg-dt-primary-subtlest rounded px-3 py-1 text-gray-900 transition hover:text-white"
          @click="onApplyFilters(['placeholder'])"
        >
          Apply Placeholder Filters
        </button>
        <span class="text-sm text-gray-600 dark:text-gray-300"
          >Selected: {{ selectedFilters.join(', ') || 'none' }}</span
        >
      </div>
    </div>

    <div
      class="border-omr-violet-light/30 dark:bg-dt-surface-base rounded-lg border bg-white/80 p-4 shadow-sm dark:border-gray-800"
    >
      <h2
        class="text-quarter-dark dark:text-dt-text-primary mb-4 text-lg font-medium"
      >
        Chart
      </h2>
      <ClientOnly>
        <div
          class="grid h-64 place-items-center text-gray-500 dark:text-gray-300"
        >
          Chart placeholder (Chart.js)
        </div>
        <template #fallback>
          <div class="grid h-64 place-items-center text-gray-400">
            Loading chart…
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped></style>
