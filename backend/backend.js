const path = require('path')
const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

// Allow requests from the frontend server
app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/build')))


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
// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
