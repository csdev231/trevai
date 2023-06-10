const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const morgan = require('morgan');

const app = express();

// Enable CORS
app.use(cors());

// Secure with Helmet
app.use(helmet());

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression Middleware
app.use(compression());

// HTTP request logger
app.use(morgan('combined'));

// Rate Limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
});

//  Apply to all requests
app.use(limiter);

// Define the static file path
app.use(express.static(path.join(__dirname, 'public')));

// Define the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
