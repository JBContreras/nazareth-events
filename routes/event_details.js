var request = require('request');
module.exports = (req, res) => {
  var id = req.params.id;
  var url = 'https://nazareth-open-tourism-platform.herokuapp.com/events/' + id;

  request.get(url, (error, event) => {
    if (error) {
      return false;
    } else {
      var options = {
        name: event.name,
        img: event.imageUrl,
        time: event.startTime + ' To ' + event.endTime + ' - At: ' + event.placeId,
        price: event.cost,
        category: event.categories,
        accessibilityOptions: event.accessibilityOptions,
        info: event.description
      };

      res.render('event_details', {
        title: 'event details',
        options: options,
        back: req.headers.referer
      });
    }
  });
};
