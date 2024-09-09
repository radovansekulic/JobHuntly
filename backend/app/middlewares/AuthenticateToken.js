const jwt = require('jsonwebtoken');

const AuthenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    jwt.verify(token, 'secret', (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user; next();
    });
}

module.exports = AuthenticateToken;