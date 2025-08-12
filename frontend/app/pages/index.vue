<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useHead } from 'nuxt/app'
import ChartComponent from '../components/ChartComponent.vue'
import FilterPanel from '../components/FilterPanel.vue'
import { useHubSpotData } from '../composables/useHubSpotData'
import { useDataProcessing } from '../composables/useDataProcessing'

useHead({ title: 'HubSpot Insights Dashboard' })

const { data, loading, error } = useHubSpotData()
const { processChartData } = useDataProcessing()

// Unified filter state
const filters = ref<{ companySize: string[]; industry: string[]; quarter: string[] }>({
  companySize: [],
  industry: [],
  quarter: [],
})
const filterState = computed(() => filters.value)

// Pick Q1 only
const questionQ1 = computed(() => data.value?.questions.find((q: { questionId: string }) => q.questionId === 'q1'))

// Process into Chart.js-ready data
const processed = computed(() => {
  if (!questionQ1.value) return null
  const processed = processChartData(questionQ1.value, filterState.value)
  return processed
})

// Force destroy/create lifecycle on data changes
const chartKey = ref(0)
watch(processed, () => { chartKey.value++ })

const selectedFiltersLabel = computed(() =>
  filters.value.companySize.length ? filters.value.companySize.join(', ') : 'none',
)
</script>

<template>
  <section class="container mx-auto space-y-8 px-4 py-8">
    <h1
      class="text-3xl font-semibold tracking-tight"
    >
      HubSpot Marketing Hub – Insights
    </h1>

    <div class="border-omr-violet-light/30 dark:bg-dt-surface-base rounded-lg border bg-white/80 p-4 shadow-sm dark:border-gray-800">
      <FilterPanel
        v-if="data"
        :filters="filters"
        :unique-values="data.uniqueValues"
        @update:filters="(f) => (filters = f)"
      />
    </div>

    <div
      class="border-omr-violet-light/30 dark:bg-dt-surface-base rounded-lg border bg-white/80 p-4 shadow-sm dark:border-gray-800"
    >
      <h2 class="text-quarter-dark dark:gradient-text mb-4 text-xl md:text-2xl font-bold">
        Visualization of Tool Productivity
      </h2>
      <ClientOnly>
        <div v-if="loading" class="grid h-64 place-items-center text-gray-500 dark:text-gray-300">Loading…</div>
        <div v-else-if="error" class="grid h-64 place-items-center text-red-600">{{ error }}</div>
        <div v-else-if="!processed || !processed.labels?.length" class="grid h-64 place-items-center text-gray-500 dark:text-gray-300">No data</div>
        <div v-else class="space-y-2">
          <ChartComponent
            :key="chartKey"
            :labels="processed.labels"
            :values="processed.values"
            :title="processed.title"
            :subtitle="processed.subtitle"
          />
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
