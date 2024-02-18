const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/jikan', async (req, res) => {
    try {
        const response = await fetch('https://api.jikan.moe/v3' + req.query.url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from Jikan API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from Jikan API' });
    }
});

app.get('/anilist', async (req, res) => {
    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: req.query.query }),
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from AniList API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from AniList API' });
    }
});

app.get('/kitsu', async (req, res) => {
    try {
        const response = await fetch('https://kitsu.io/api/edge' + req.query.url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from Kitsu API:', error);
        res.status(500).json({ error: 'An error occurred while fetching
