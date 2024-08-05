const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { DateTime } = require('luxon');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/check-movies', async (req, res) => {
    const user = req.body.username;
    const url = `https://letterboxd.com/${user}/`;

    const selectors = [
        '#content > div > section > div > div.profile-info.-has-bio.-has-no-meta.-is-not-hq.js-profile-info > div.profile-stats.js-profile-stats > h4:nth-child(2) > a > span.value',
        '#content > div > section > div > div.profile-info.-has-bio.-has-meta.-is-not-hq.js-profile-info > div.profile-stats.js-profile-stats > h4:nth-child(2) > a > span.value',
        '#content > div > section > div > div.profile-info.-has-no-bio.-has-no-meta.-is-not-hq.js-profile-info > div > h4:nth-child(2) > a > span.value',
        '#content > div > section > div > div.profile-info.-has-no-bio.-has-meta.-is-not-hq.js-profile-info > div.profile-stats.js-profile-stats > h4:nth-child(2) > a > span.value'
    ];

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        let value = null;

        for (const selector of selectors) {
            const valueElement = $(selector);
            if (valueElement.length > 0) {
                value = parseInt(valueElement.text().replace(',', ''), 10);
                break;
            }
        }

        if (value === null) {
            return res.status(404).json({ message: 'Movies count not found' });
        }

        res.json({ moviesWatched: value });

    } catch (error) {
        console.error("Error fetching the URL:", error);
        res.status(500).json({ message: 'Error fetching the URL' });
    }
});

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
