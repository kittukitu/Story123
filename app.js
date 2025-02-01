const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/indexRoutes');
const chatRoutes = require('./routes/chatRoutes');
const isAuthenticated = require('./middleware/authMiddleware');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Session Configuration
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

// Routes
app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/chat', isAuthenticated, chatRoutes);
app.use('/admin', isAuthenticated, adminRoutes);

// Start the Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});