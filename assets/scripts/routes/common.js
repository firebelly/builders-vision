import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import appState from '../util/appState';

let $body,
		$window,
		$html,
		$siteNav;

const common = {
  init() {
    // JavaScript to be fired on all pages
    $body = $('body');
    $window = $(window);
    $html = $('html');
    $siteNav = $('.nav-main');

    // Mobile hamburger and X close icons toggle mobile nav
    $('.hamburger').on('click', function(e) {
      e.preventDefault();
      common.openNav();
    });
    $('.site-nav a').on('focus', function() {
      if (!appState.navOpen) {
        common.openNav();
      }
    });
    $('a.toggle-nav.close').on('click', function(e) {
      e.preventDefault();
      common.closeNav();
    });

    // Keyboard navigation and esc handlers
    $(document).keyup(function(e) {
      // esc
      if (e.keyCode === 27) {
        common.closeNav();
        // Unfocus any focused elements
        if (document.activeElement != document.body) {
          document.activeElement.blur();
        }
      }
    }).on('click', 'body.nav-open', function(e) {
      // Clicking outside of modal closes modal
      let $target = $(e.target);
      // Make sure target inside modal content
      if ($target.parents('.toggle-nav').length === 0 && !$target.hasClass('site-nav')  && !$target.hasClass('toggle-nav') && $target.parents('.site-nav').length === 0) {
        common.closeNav();
      }
    });

  },

  // Close main and any child nav elements
  closeNav() {
    if (!appState.navOpen) {
      return;
    }
    document.body.classList.remove('nav-open');
    enableBodyScroll($siteNav[0]);
    $html.css('overflow', '');
  },

  openNav() {
  	document.body.classList.add('nav-open');
    appState.navOpen = true;
    disableBodyScroll($siteNav[0]);
    $html.css('overflow', 'hidden');
  },

  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};

export default common;
