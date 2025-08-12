<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  labels: string[]
  values: number[]
  title?: string
  subtitle?: string
}

const props = defineProps<Props>()

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Mentions',
      data: props.values,
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
    },
  ],
}))

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
  responsive: true,
  indexAxis: 'y',
  plugins: {
    title: { display: !!props.title, text: props.title },
    subtitle: { display: !!props.subtitle, text: props.subtitle },
    legend: { display: false },
  },
}))
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
  
</template>

<style scoped></style>


