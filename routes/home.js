module.exports = (req, res) => {
  res.render('home', {
    title: 'events',
    calendarButton: true,
    filterButtons: true
  });
};
