<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'

export interface FilterState {
  companySize: string[]
  industry: string[]
  quarter: string[]
}

const props = defineProps({
  filters: { type: Object as PropType<FilterState>, required: true },
  uniqueValues: {
    type: Object as PropType<{ companySize: string[]; industry: string[]; quarter: string[] }>,
    required: true,
  },
})
const emit = defineEmits<{ 'update:filters': [FilterState] }>()

const localFilters = ref<FilterState>({
  companySize: [...props.filters.companySize],
  industry: [...props.filters.industry],
  quarter: [...props.filters.quarter],
})

watch(
  () => props.filters,
  (nf) => {
    localFilters.value = {
      companySize: [...nf.companySize],
      industry: [...nf.industry],
      quarter: [...nf.quarter],
    }
  },
  { deep: true },
)

function toggle(key: keyof FilterState, value: string) {
  const set = new Set(localFilters.value[key])
  if (set.has(value)) set.delete(value)
  else set.add(value)
  localFilters.value[key] = Array.from(set)
  emit('update:filters', { ...localFilters.value })
}

const hasActive = computed(
  () =>
    localFilters.value.companySize.length > 0 ||
    localFilters.value.industry.length > 0 ||
    localFilters.value.quarter.length > 0,
)

function clearAll() {
  localFilters.value = { companySize: [], industry: [], quarter: [] }
  emit('update:filters', { ...localFilters.value })
}
</script>

<template>
  <div class="space-y-4 md:space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <h2 class="text-quarter-dark dark:gradient-text mb-4 text-xl md:text-2xl font-bold">Filter Bar</h2>
      <button
        class="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-omr-violet-dark/50 text-gray-200 rounded-lg border border-omr-violet-dark/30 hover:bg-omr-violet-dark/70 transition-all duration-200 shadow-none hover:shadow-sm text-sm md:text-base"
        @click="clearAll"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="hidden sm:inline">Clear All</span>
        <span class="sm:hidden">Clear</span>
      </button>
    </div>

    <div class="space-y-3 md:space-y-4 text-gray-200">
      <!-- Company Size -->
      <div class="space-y-2 md:space-y-3">
        <h4 class="text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wide">Company Size</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="size in uniqueValues.companySize"
            :key="size"
            class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-xs md:text-sm backdrop-blur-sm"
            :class="localFilters.companySize.includes(size)
              ? 'bg-omr-violet-dark/30 border-omr-violet-dark/50 text-white'
              : 'bg-omr-violet-dark/10 border-omr-violet-dark/30 text-gray-200 hover:bg-omr-violet-dark/20'"
            @click="toggle('companySize', size)"
          >
            <span class="truncate max-w-[160px] md:max-w-none">{{ size }}</span>
          </button>
        </div>
      </div>

      <!-- Industry -->
      <div class="space-y-2 md:space-y-3">
        <h4 class="text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wide">Industry</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="ind in uniqueValues.industry"
            :key="ind"
            class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-xs md:text-sm backdrop-blur-sm"
            :class="localFilters.industry.includes(ind)
              ? 'bg-omr-teal-dark/30 border-omr-teal-dark/50 text-white'
              : 'bg-omr-teal-dark/10 border-omr-teal-dark/30 text-gray-200 hover:bg-omr-teal-dark/20'"
            @click="toggle('industry', ind)"
          >
            <span class="truncate max-w-[160px] md:max-w-none">{{ ind }}</span>
          </button>
        </div>
      </div>

      <!-- Quarter -->
      <div class="space-y-2 md:space-y-3">
        <h4 class="text-xs md:text-sm font-semibold text-gray-300 uppercase tracking-wide">Quarter</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="q in uniqueValues.quarter"
            :key="q"
            class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors text-xs md:text-sm backdrop-blur-sm"
            :class="localFilters.quarter.includes(q)
              ? 'bg-omr-yellow-dark/30 border-omr-yellow-dark/50 text-white'
              : 'bg-omr-yellow-dark/10 border-omr-yellow-dark/30 text-gray-200 hover:bg-omr-yellow-dark/20'"
            @click="toggle('quarter', q)"
          >
            <span class="truncate max-w-[160px] md:max-w-none">{{ q }}</span>
          </button>
        </div>
      </div>

      <!-- No Filters Message -->
      <div v-if="!hasActive" class="text-center py-2 md:py-3">
        <div class="text-gray-400 text-sm">No filters applied</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>


