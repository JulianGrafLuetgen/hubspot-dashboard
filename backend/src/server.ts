import express, { Request, Response } from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files (optional)
app.use('/static', express.static(join(__dirname, '..', 'data')));

// API response types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

interface RootResponse {
  message: string;
  version: string;
  endpoints: Record<string, string>;
}

// API endpoint to serve HubSpot data
app.get('/api/hubspot-data', (req: Request, res: Response<ApiResponse<any>>) => {
  try {
    const dataPath = join(__dirname, '..', 'data', 'data.json');
    const data = readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(data);
    
    res.json({
      success: true,
      data: jsonData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load HubSpot data',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response<HealthResponse>) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'hubspot-data-api'
  });
});

// Root endpoint
app.get('/', (req: Request, res: Response<RootResponse>) => {
  res.json({
    message: 'HubSpot Data API',
    version: '1.0.0',
    endpoints: {
      '/api/hubspot-data': 'Get HubSpot evaluation data',
      '/api/health': 'Health check'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 HubSpot Data API server running on http://localhost:${PORT}`);
  console.log(`📊 Data endpoint: http://localhost:${PORT}/api/hubspot-data`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
});
