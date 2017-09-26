const request = require('request');
const getPlaces = require('./get_places.js');

module.exports = (req, res) => {
  var placeResponse = [];
  getPlaces((err, places) => {
    if (err) return err;
    placeResponse = places;
    const url = 'https://nazareth-open-tourism-platform.herokuapp.com/events';
    const filterResponse = placeResponse.filter((place) => {
      return place.name === req.body.place_name;
    });

    const requestBody = {
      place: filterResponse[0].id,
      categories: req.body.categories,
      accessibilityOptions: req.body.accessibilityOptions,
      startTime: req.body.startDate + 'T' + req.body.startTime,
      endTime: req.body.endDate + 'T' + req.body.endTime,
      cost: req.body.cost,
      imageUrl: req.body.imageUrl,
      en: {
        name: req.body.name,
        description: req.body.description
      }
    };

    const options = {
      method: 'post',
      body: requestBody,
      json: true,
      url
    };

    request(options, (error, result) => {
      if (error) {
        res.send(error);
      } else {
        if (result.statusCode >= 400 && result.statusCode <= 499) {
          res.send(`error :( ${result.body.reasons}`);
        } else if (result.statusCode >= 500 && result.statusCode <= 599) {
          res.send('server error');
        } else if (result.statusCode >= 200 && result.statusCode <= 299) {
          res.redirect('/');
        }
      }
    });
  });
};
