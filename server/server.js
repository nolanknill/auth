const express = require('express');
const app = express();
const PORT = 8080;
require("dotenv").config();
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/login", authRoutes);
// app.use("/posts", postRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
