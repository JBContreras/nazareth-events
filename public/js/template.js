import homeView from '../../views/home.hbs';
import { initEventListeners } from './filter_listeners';
import { initCalendarEventListener } from './main.js';
import parse from 'webpack-parse-query';

let eventsState = [];
let categoryState = [];

export let state = { date_from: new Date(), category: [], lang: 'en' };

function render() {
  console.log(state);
  let filteredEvents = eventsState.filter(event => event[state.lang]);
  if (state.date_from) {
    const newDateTo = new Date();
    const newDateFrom = new Date(state.date_from);
    filteredEvents = filteredEvents.filter(
      event =>
        new Date(event.startTime) >= newDateFrom &&
        new Date(event.startTime) <=
          new Date().setFullYear(newDateTo.getFullYear() + 1)
    );
  } else if (state.categories && !state.date_from) {
    filteredEvents = filteredEvents.filter(
      event => new Date(event.startTime) > new Date()
    );
  } else {
    filteredEvents = filteredEvents.filter(
      event => new Date(event.startTime) > new Date()
    );
  }
  console.log(filteredEvents);

  if (state.category.length) {
    filteredEvents = filteredEvents.filter(event => {
      return state.category.some(category =>
        event.categories.includes(category)
      );
    });
  }

  const template = homeView({
    events: filteredEvents,
    lang: state.lang,
    calendarButton: true,
    filterButtons: true,
    english: state.lang === 'en',
    arabic: state.lang === 'ar',
    currentDate: state.date_from || new Date().toISOString().split('T')[0]
  });
  document.getElementById('root').innerHTML = template;
  initCalendarEventListener(eventsState);
  initEventListeners();
}

export function updateEvents(data) {
  eventsState = data;
}

export function addCategory(category) {
  state.category.push(category);
  render();
}

export function removeCategory(category, dateFilter) {
  state.category = state.category.filter(cat => cat !== category);
  render();
}
