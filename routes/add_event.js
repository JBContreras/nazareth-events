const request = require('request');

module.exports = (req, res) => {
  const url = 'https://nazareth-open-tourism-platform.herokuapp.com/events';

  const requestBody = {
    place: req.locals.id,
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
      res.redirect(`/event/${req.locals.id}`);
    }
  });
};
