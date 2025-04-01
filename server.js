const express = require('express');
const path = require('path');
const app = express();

// Session management
const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/game/flappybird', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'flappybird.html'));
});

app.get('/game/flight', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'flight.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 