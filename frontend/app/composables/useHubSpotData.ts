import { ref, computed } from 'vue'
import { useFetch } from '#app'

export interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp: string
}

export interface DataEntry {
  companySize: 'Startup (1-10)' | 'Small (11-50)' | 'Medium (51-200)' | 'Large (201-1000)' | 'Enterprise (1000+)'
  industry: 'E-Commerce' | 'Media & Marketing' | 'Finance & Banking' | 'SaaS & Technology' | 'Education' | 'Consulting'
  quarter: '2024-Q1' | '2024-Q2' | '2024-Q3' | '2024-Q4'
  responseValue: string
  numResponses: number
}

export interface Question {
  questionId: 'q1' | 'q2' | 'q3'
  questionNumber: number
  question: string
  questionType: 'multi_response'
  description: string
  data: DataEntry[]
}

export interface HubSpotData {
  metadata?: Record<string, unknown>
  uniqueValues: {
    companySize: string[]
    industry: string[]
    quarter: string[]
  }
  questions: Question[]
}

export function useHubSpotData() {
  const url = 'http://localhost:3001/api/hubspot-data'
  const { data, pending, error } = useFetch<ApiResponse<HubSpotData>>(url, { server: false })

  const hubspot = computed(() => data.value?.data)
  const timestamp = computed(() => data.value?.timestamp)
  const errorMessage = computed(() => (error.value ? String(error.value) : null))

  return {
    data: hubspot,
    loading: pending,
    error: errorMessage,
    timestamp,
  }
}


