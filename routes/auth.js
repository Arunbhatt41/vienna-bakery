const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Simulate successful login
    if (username === 'admin' && password === 'password') {
        return res.json({ success: true });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

module.exports = router;