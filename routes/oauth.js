const qs = require('querystring');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.query.state !== process.env.STATE) {
    res.redirect(`${process.env.OAUTH_URI}/authorize`);
  } else {
    try {
      const tokenRes = await axios({
        method: 'POST',
        url: `${process.env.OAUTH_URI}/token`,
        data: qs.stringify({
          code: req.query.code,
          client_secret: process.env.CLIENT_SECRET,
          client_id: process.env.CLIENT_ID,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: 'authorization_code'
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const token = jwt.sign(
        tokenRes.data.access_token,
        process.env.JWT_SECRET
      );
      res.cookie('token', token, { maxAge: 604800000 });
      res.redirect('/add-event');
    } catch (err) {
      res.render('error', {
        errorMessage: 'There was a problem logging you in, please try again'
      });
    }
  }
};
