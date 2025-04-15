require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route imports
const authRoutes = require('./routes/authRoutes');
const emgRoutes = require('./routes/emgRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// === Middleware ===
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.4.38:3000'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === MongoDB Connection ===
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('❌ Missing MONGODB_URI in .env file!');
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1); // Exit if DB fails to connect
});

// === Routes ===
app.use('/api/auth', authRoutes);
app.use('/api/emg', emgRoutes);

// === Health check ===
app.get('/', (req, res) => {
  res.send('💡 EMG API is up and running!');
});

// === Global Error Handling Middleware ===
app.use((err, req, res, next) => {
  console.error('🚨 Uncaught Server Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong on the server.', 
    error: err.message 
  });
});

// === Start the Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
