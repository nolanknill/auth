require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();

// POST /login  { username, password }  
router.post("/", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: "Login requires username and password"
        });
    }

    // Verify the user credentials!
    knex("user")
        .where({ email: username })
        .then((foundUsers) => {
            // No matching email
            if (foundUsers.length === 0) {
                return res.status(401).json({
                    error: "Invalid login credentials"
                });
            }

            // Matching email, check password!
            const matchingUser = foundUsers[0];

            const isValidPassword = bcrypt.compareSync(password, matchingUser.password);

            if (!isValidPassword) {
                return res.status(401).json({
                    error: "Invalid login credentials"
                });
            }

            const token = jwt.sign(
                { 
                    user_id: matchingUser.id 
                }, 
                process.env.JWT_SECRET_KEY, 
                { 
                    expiresIn: '24h' 
                }
            );
            
            res.json({
                token: token,
                message: "Successfully logged in, enjoy your stay"
            });
        })
});

module.exports = router;