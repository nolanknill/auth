require('dotenv').config();
const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
    const bearerTokenString = req.headers.authorization;

    if (!bearerTokenString) {
        return res.status(401).json({
            error: "Resource requires Bearer token authorization"
        })
    }

    // bearerTokenString -> `Bearer ${token}`
    const splitBearerToken = bearerTokenString.split(" ");

    if (splitBearerToken.length !== 2) {
        return res.status(400).json({
            error: "Bearer token is malformed"
        })
    }

    const bearerToken = splitBearerToken[1];

    jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: "Invalid JWT"
            })
        }
        
        req.user_id = payload.user_id;
        next();
    })
}

module.exports = authorize;