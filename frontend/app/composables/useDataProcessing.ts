import type { Question, FilterState } from './useHubSpotData'
import { DataFrame } from '../../../packages/pandas-facade/src/index'

interface ProcessedChartData {
  labels: string[]
  values: number[]
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
    
    // Use facade for grouping + aggregation
    const df = new DataFrame(filtered);
    const aggregated = df
      .groupBy('responseValue')
      .sum('numResponses')
      .sortValues('numResponses', { ascending: false })
      .to_json();

    // Generate filter summary for subtitle
  const filterParts = [];
  if (filters.companySize.length) filterParts.push(`${filters.companySize.join(', ')}`);
  if (filters.industry.length) filterParts.push(`${filters.industry.join(', ')}`);
  if (filters.quarter.length) filterParts.push(`${filters.quarter.join(', ')}`);
  
  const subtitle = filterParts.length 
    ? `Filtered: ${filterParts.join(' | ')}` 
    : 'All Data';

  return {
    labels: Object.values(aggregated.responseValue),
    values: Object.values(aggregated.numResponses),
    title: question.question,
    subtitle,
  }
  }

  return { processChartData }
}


