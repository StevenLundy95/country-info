const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

// Allow requests from the frontend server
app.use(cors());
app.get("/", (req, res) => {
    res.send("Welcome to the Country Info API!");
});
app.get("/country/:name", async (req, res) => {
    const { name } = req.params;
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
        const data = response.data;
        if (data.status === 404) {
            res.status(404).json({ error: "Country not found" });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching country information" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
