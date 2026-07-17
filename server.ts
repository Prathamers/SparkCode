import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3100;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Sparkcode Backend Server is running! Check /api/health for status.');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sparkcode Server is running!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
