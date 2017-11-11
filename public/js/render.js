/* global getEventsModule type:true */
/* eslint no-global-assign: "error" */

var renderModule = function (error, apiData) {
  renderEvents(apiData, 'en');

  document.getElementById('arLang').addEventListener('click', function () {
    renderEvents(apiData, 'ar');
  });
  document.getElementById('enLang').addEventListener('click', function () {
    renderEvents(apiData, 'en');
  });

  function renderEvents (eventsArray, language) {
    if (language === 'en') {
      document.getElementById('enLang').classList.add('active-lang');
      document.getElementById('arLang').classList.remove('active-lang');
    } else {
      document.getElementById('enLang').classList.remove('active-lang');
      document.getElementById('arLang').classList.add('active-lang');
    }

    var listPage = document.getElementById('list-page-content');
    var eventsSection = document.getElementById('events-section');
    while (eventsSection.firstChild) {
      eventsSection.removeChild(eventsSection.firstChild);
    }

    if (eventsArray.length === 0) {
      var noEvents = document.createElement('h1');
      noEvents.innerHTML = 'No upcoming events.';
      noEvents.className = 'no-events';
      return eventsSection.appendChild(noEvents);
    }
    if (error) {
      eventsSection.innerHTML = error;
    }

    if (language === 'en') {
      eventsArray = eventsArray.filter(function (event) {
        return event.en;
      });
    } else {
      eventsArray = eventsArray.filter(function (event) {
        return event.ar;
      });
    }

    eventsArray.forEach(function (event) {
      var h3Element = document.createElement('h3');
      h3Element.className = 'event-name';

      var h4Element = document.createElement('h4');
      h4Element.className = 'time';

      var h5Element = document.createElement('h5');
      h5Element.className = 'where';

      var aElement = document.createElement('a');
      aElement.href = language + '/events/' + event._id;
      aElement.className = 'event-link';

      h3Element.innerHTML = language === 'ar' && event.ar ? event.ar.name : event.en.name;
      h5Element.innerHTML = (event.place ? event.place.en.name : ' ');
      h4Element.innerHTML = new Date(event.startTime).toDateString().split(' ', [3]).join(' ') + ' / ' + new Date(new Date(event.startTime).getTime()).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'}) + ' - ' + new Date(new Date(event.endTime).getTime()).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'});

      aElement.appendChild(h3Element);
      aElement.appendChild(h5Element);
      aElement.appendChild(h4Element);
      eventsSection.appendChild(aElement);
    });
    listPage.appendChild(eventsSection);
  };
};
