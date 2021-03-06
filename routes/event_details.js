const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  const url = `${process.env.PRODUCTION_API}/events/${req.params.id}`;

  try {
    const specificEventResponse = await axios.get(url);
    const event = specificEventResponse.data;
    let lng;
    let lat;
    if (event.place.location) {
      lat = event.place.location[0];
      lng = event.place.location[1];
    } else {
      let address = event.place[req.params.lang].address;
      const geocode = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${
          address
        }&region=il&key=${process.env.GEOCODE_KEY}`
      );
      const { location } = geocode.data.results[0].geometry;
      lng = location.lng;
      lat = location.lat;
    }

    res.render('event_details', {
      title: 'Event Details',
      eventText: event[req.params.lang],
      event,
      placeDetails: event.place[req.params.lang],
      placeContact: event.place,
      back: req.headers.referer,
      key: process.env.GOOGLE_MAPS_KEY,
      lng,
      lat,
      website: event.place.website,
      facebook: event.place.website
        ? event.place.website.includes('facebook')
        : ''
    });
  } catch (err) {
    res.render('error', {
      errorMessage: 'Sorry something went wrong please try again'
    });
  }
};
