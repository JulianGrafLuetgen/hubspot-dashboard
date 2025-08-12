import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'

if (import.meta.client) {
  Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)
}

export { Chart }
