const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

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
