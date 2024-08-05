const axios = require('axios');
const cheerio = require('cheerio');
const { DateTime } = require('luxon');

const user = "jeremyjacob";
const goal = 800;
const url = `https://letterboxd.com/${user}/`;

const selectors = [
    '#content > div > section > div > div.profile-info.-has-bio.-has-no-meta.-is-not-hq.js-profile-info > div.profile-stats.js-profile-stats > h4:nth-child(2) > a > span.value',
    '#content > div > section > div > div.profile-info.-has-bio.-has-meta.-is-not-hq.js-profile-info > div.profile-stats.js-profile-stats > h4:nth-child(2) > a > span.value',
    '#content > div > section > div > div.profile-info.-has-no-bio.-has-no-meta.-is-not-hq.js-profile-info > div > h4:nth-child(2) > a > span.value',
    '#content > div > section > div > div.profile-info.-has-no-bio.-has-meta.-is-not-hq.js-profile-info > div.profile-stats.js-profile-stats > h4:nth-child(2) > a > span.value'
];

axios.get(url)
    .then(response => {
        const $ = cheerio.load(response.data);
        let value = null;

        for (const selector of selectors) {
            try {
                const valueElement = $(selector);
                if (valueElement.length > 0) {
                    value = parseInt(valueElement.text().replace(',', ''), 10);
                    break;
                }
            } catch (error) {
                console.log("Error -- not found");
                process.exit(1);
            }
        }

        if (value === null) {
            console.log("Value not found");
            return;
        }

        const currentDate = DateTime.now();
        const startOfYear = DateTime.fromObject({ year: currentDate.year, month: 1, day: 1 });
        const daysPassed = currentDate.diff(startOfYear, 'days').days + 1;

        const avgMonthLength = 30.44;
        const monthsPassed = (daysPassed / avgMonthLength);
        const moviesPerMonth = (value / monthsPassed).toFixed(1);

        const result = Math.round(value * 365.25 / daysPassed);

        console.log(`\n\n\n${user}\n------------------------`);
        console.log(`Number of movies watched this year so far: ${value}`);
        let numberOfMoviesWatched = value
        console.log(`Average number of movies watched per month: ${moviesPerMonth}\n`);
        console.log(`On pace this year to watch this many movies: ${result}\n`);

        const moviesLeft = goal - value;

        if (moviesLeft <= 0) {
            console.log("Movie goal already reached!");
        } else {
            const endOfYear = DateTime.fromObject({ year: currentDate.year, month: 12, day: 31 });
            const daysLeft = endOfYear.diff(currentDate, 'days').days + 1;
            const moviesPerDay = (moviesLeft / daysLeft);
            console.log(`\nTo reach ${goal} movies watched for the year,\n${user} must watch around ${(moviesPerDay * avgMonthLength).toFixed(1)} movies per month for the rest of ${currentDate.year}.\n\n\n`);
        }
    })
    .catch(error => {
        console.error("Error fetching the URL:", error);
    });
