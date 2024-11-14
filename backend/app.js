const express = require('express');
const axios = require('axios');
const path = require('path'); 
const app = express();
const PORT = 3000;

const apiKey = '9a7cc609184645cf936bf224815e95bc';
const baseUrl = 'https://api.football-data.org/v4/competitions/PL/matches';
const headers = { 'X-Auth-Token': apiKey };

app.set('view engine', 'ejs');

app.get('/upcoming', (req, res) => {
    res.render('index');
});
app.get('/next_match', async (req, res) => {
    try {
        const response = await axios.get(baseUrl, {
            headers: headers,
            params: { status: 'SCHEDULED', limit: 5 }
        });

        const data = response.data;
        const matches = data.matches || [];

        const upcomingMatches = matches.map(match => ({
            home_team: match.homeTeam.name,
            away_team: match.awayTeam.name,
            match_date: match.utcDate
        }));

        res.json({ matches: upcomingMatches });
    } catch (error) {
        res.json({ error: 'Failed to retrieve match data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/howtoplay', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'howtoplay.html'));
});
