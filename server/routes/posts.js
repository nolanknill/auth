const express = require('express');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();
const authorize = require("../middleware/authorize");

// GET /posts
router.get("/", authorize, (req, res) => {
    /*
        ✅req.user_id should be available
        ✅ get posts of that user_id
        ✅ respond with posts for this specific user
    */

    knex("post")
        .where({ user_id: req.user_id })
        .then((posts) => {
            res.json(posts);
        });
})

module.exports = router;