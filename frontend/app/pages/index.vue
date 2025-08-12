<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useHead } from 'nuxt/app'
import ChartComponent from '../components/ChartComponent.vue'
import { useHubSpotData } from '../composables/useHubSpotData'
import { useDataProcessing } from '../composables/useDataProcessing'

useHead({ title: 'HubSpot Insights Dashboard' })

const { data, loading, error } = useHubSpotData()
const { processChartData } = useDataProcessing()

// Filter state (company size only for now)
const selectedCompanySizes = ref<string[]>([])
function toggleCompanySize(size: string) {
  const next = new Set(selectedCompanySizes.value)
  if (next.has(size)) next.delete(size)
  else next.add(size)
  selectedCompanySizes.value = Array.from(next)
}
const filterState = computed(() => ({
  companySize: selectedCompanySizes.value,
  industry: [],
  quarter: [],
}))

// Pick Q1 only
const questionQ1 = computed(() => data.value?.questions.find((q: { questionId: string }) => q.questionId === 'q1'))

// Process into Chart.js-ready data
const processed = computed(() => {
  if (!questionQ1.value) return null
  return processChartData(questionQ1.value, filterState.value)
})

// Force destroy/create lifecycle on data changes
const chartKey = ref(0)
watch(processed, () => { chartKey.value++ })

const selectedFiltersLabel = computed(() =>
  selectedCompanySizes.value.length ? selectedCompanySizes.value.join(', ') : 'none',
)
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
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm text-gray-600 dark:text-gray-300">Company Size:</span>
        <template v-if="data">
          <button
            v-for="size in data.uniqueValues.companySize"
            :key="size"
            class="rounded border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
            :class="selectedCompanySizes.includes(size) ? 'bg-gray-200 dark:bg-white/20' : ''"
            @click="toggleCompanySize(size)"
          >
            {{ size }}
          </button>
        </template>
        <span class="text-sm text-gray-600 dark:text-gray-300">Selected: {{ selectedFiltersLabel }}</span>
      </div>
    </div>

    <div
      class="border-omr-violet-light/30 dark:bg-dt-surface-base rounded-lg border bg-white/80 p-4 shadow-sm dark:border-gray-800"
    >
      <h2 class="text-quarter-dark dark:text-dt-text-primary mb-4 text-lg font-medium">
        Chart
      </h2>
      <ClientOnly>
        <div v-if="loading" class="grid h-64 place-items-center text-gray-500 dark:text-gray-300">Loading…</div>
        <div v-else-if="error" class="grid h-64 place-items-center text-red-600">{{ error }}</div>
        <div v-else-if="!processed || !processed.labels?.length" class="grid h-64 place-items-center text-gray-500 dark:text-gray-300">No data</div>
        <div v-else class="space-y-2">
          <ChartComponent
            :key="chartKey"
            :labels="processed.labels"
            :values="(processed.datasets?.[0]?.data as number[])"
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
