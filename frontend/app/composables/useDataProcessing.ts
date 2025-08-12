import type { ChartData } from 'chart.js'
import { DataFrame } from 'pandas-js'
import type { Question, FilterState } from './useHubSpotData'

interface ProcessedChartData extends ChartData {
  title: string
  subtitle: string
}

export function useDataProcessing() {
  function processChartData(question: Question, filters: FilterState): ProcessedChartData {
    const filtered = question.data.filter((entry) =>
      (!filters.companySize.length || filters.companySize.includes(entry.companySize)) &&
      (!filters.industry.length || filters.industry.includes(entry.industry)) &&
      (!filters.quarter.length || filters.quarter.includes(entry.quarter)),
    )

    const df = new DataFrame(filtered)
    const aggregated = df
      .groupBy('responseValue')
      .sum('numResponses')
      .sortValues('numResponses', { ascending: false })
      .toJSON<{ numResponses: Record<string, number> }>()

    // pandas-js toJSON shape may vary; expect something like { numResponses: { key: value } }
    const counts = aggregated.numResponses

    const labels = Object.keys(counts)
    const data = Object.values(counts)

    const parts: string[] = []
    if (filters.companySize.length) parts.push(filters.companySize.join(', '))
    if (filters.industry.length) parts.push(filters.industry.join(', '))
    if (filters.quarter.length) parts.push(filters.quarter.join(', '))

    const subtitle = parts.length ? `Filtered: ${parts.join(' | ')}` : 'All Data'

    return { labels, datasets: [{ label: 'Mentions', data }], title: question.question, subtitle }
  }

  return { processChartData }
}


