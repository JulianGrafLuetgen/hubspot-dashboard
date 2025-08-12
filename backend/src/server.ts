import express, { Request, Response } from 'express'
import cors from 'cors'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp: string
}

interface DataEntry {
  companySize: 'Startup (1-10)' | 'Small (11-50)' | 'Medium (51-200)' | 'Large (201-1000)' | 'Enterprise (1000+)'
  industry: 'E-Commerce' | 'Media & Marketing' | 'Finance & Banking' | 'SaaS & Technology' | 'Education' | 'Consulting'
  quarter: '2024-Q1' | '2024-Q2' | '2024-Q3' | '2024-Q4'
  responseValue: string
  numResponses: number
}

interface Question {
  questionId: 'q1' | 'q2' | 'q3'
  questionNumber: number
  question: string
  questionType: 'multi_response'
  description: string
  data: DataEntry[]
}

interface HubSpotData {
  metadata?: Record<string, unknown>
  uniqueValues: {
    companySize: string[]
    industry: string[]
    quarter: string[]
  }
  questions: Question[]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
app.use(cors())

const PORT = Number(process.env.PORT || 3001)

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'hubspot-backend' })
})

app.get('/api/hubspot-data', async (_req: Request, res: Response) => {
  try {
    const dataPath = join(__dirname, '..', 'data', 'data.json')
    const raw = await readFile(dataPath, 'utf-8')
    const parsed: HubSpotData = JSON.parse(raw)
    const response: ApiResponse<HubSpotData> = {
      success: true,
      data: parsed,
      timestamp: new Date().toISOString(),
    }
    res.json(response)
  } catch (error) {
    res.status(500).json({ success: false, data: null, timestamp: new Date().toISOString(), error: String(error) })
  }
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[backend] listening on http://localhost:${PORT}`)
})


