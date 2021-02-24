// Import local dependencies
import jQuery from 'jquery';

import Router from './util/Router';
import appState from './util/appState';
import stickyNav from './util/stickyNav';
import navWaypoints from './util/navWaypoints';
import revealOnScroll from './util/revealOnScroll';

import common from './routes/common';
import home from './routes/home';

window.$ = window.jQuery = jQuery;

// Populate Router instance with DOM routes
const routes = new Router({
  common,
  home,
});

// Init appState utility object
appState.init();

// Init sticky nav
stickyNav.init();

// Init nav waypoints
navWaypoints.init();

// Init element reveals on scroll
revealOnScroll.init();

// Load Events
$(document).ready(() => routes.loadEvents());
