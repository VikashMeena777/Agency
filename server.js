const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port for dev
  credentials: true,
}));
app.use(express.json());

// Example API route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// TODO: Add your other API routes here, e.g.:
// app.use('/api/auth', require('./routes/auth'));  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});