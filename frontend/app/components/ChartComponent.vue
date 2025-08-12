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
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  labels: string[]
  values: number[]
  title?: string
  subtitle?: string
  chartType?: 'horizontal' | 'vertical'
}

const props = defineProps<Props>()

const omrColors = {
  white: '#ffffff',
  gray400: 'rgb(156, 163, 175)',
  gray600_30: 'rgba(75, 85, 99, 0.3)',
  gray900_95: 'rgba(17, 24, 39, 0.95)',
  darkViolet: '#5b21b6',
}

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Mentions',
      data: props.values,
      // Purple, slightly transparent
      backgroundColor: 'rgba(91, 33, 182, 0.7)',
      borderColor: 'rgba(91, 33, 182, 1)',
      borderWidth: 1,
    },
  ],
}))

const chartOptions = computed<ChartOptions<'bar'>>(() => {
  return {
    layout: { padding: { top: 8, bottom: 8 } },
    plugins: {
      title: {
        display: !!props.title,
        text: props.title ?? 'Chart',
        font: {
          size: 20,
          weight: 'bold',
          family: 'OMR Sans, Inter, system-ui, sans-serif',
        },
        color: omrColors.white,
        padding: 20,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: omrColors.gray900_95,
        titleColor: omrColors.white,
        bodyColor: omrColors.white,
        borderColor: omrColors.darkViolet,
        borderWidth: 2,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const parsed = context.parsed as { x?: number; y?: number }
            const val = (typeof parsed.y === 'number' ? parsed.y : parsed.x) ?? 0
            return `${val} responses`
          },
        },
      },
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Responses',
          color: omrColors.white,
          font: { size: 14, weight: 'bold', family: 'OMR Sans, Inter, system-ui, sans-serif' },
          padding: 10,
        },
        ticks: {
          color: omrColors.white,
          font: { size: 12, family: 'OMR Sans, Inter, system-ui, sans-serif' },
        },
        grid: { color: omrColors.gray600_30, drawBorder: false },
      },
      y: {
        title: {
          display: true,
          text: 'Categories',
          color: omrColors.white,
          font: { size: 14, weight: 'bold', family: 'OMR Sans, Inter, system-ui, sans-serif' },
          padding: 10,
        },
        ticks: {
          color: omrColors.white,
          font: { size: 12, family: 'OMR Sans, Inter, system-ui, sans-serif' },
        },
        grid: { color: omrColors.gray600_30, drawBorder: false },
      },
    },
    animation: { duration: 750, easing: 'easeInOutQuart' },
  }
})
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
  
</template>

<style scoped></style>


