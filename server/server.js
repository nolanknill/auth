const express = require('express');
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
