/* eslint-disable strict */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('dev'));
const playstore = require('./playstore');

app.get('/apps', (req, res) => {
    const sort = req.query.sort;
    const genres = req.query.genres;
    let results;
    if (genres) {
        results = playstore.filter(app => {
            return app
                .Genres
                .toLowerCase()
                .includes(genres.toLowerCase());
        })
    }

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            res
                .status(400)
                .send('Must sort by Rating or App');
        }
        if (['rating'].includes(sort)) {
            playstore
                .sort((a, b) => {
                    return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
                });
        }

        res.json(results);
    });

app.listen(8000, () => console.log('Server listening on 8000'));