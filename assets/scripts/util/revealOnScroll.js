// Slide up & fade reveal treatment as you scroll
//
// Fades and slides in elements as they appear in the viewport

let reveals,
    activated = [],
    $window,
    windowHeight,
    scrollTop,
    ticking;

const revealOnScroll = {

  // Init sticky headers
  init() {
    if ($('.-reveal').length) {
      $window = $(window);
      reveals = document.querySelectorAll('.-reveal,.lines');

      revealOnScroll.resize();
      revealOnScroll.update();

      $window.off('scroll.reveals').on('scroll.reveals', revealOnScroll.scrolling);
      $window.off('resize.reveals').on('resize.reveals', revealOnScroll.resize);
      $window.off('load.reveals').on('load.reveals', revealOnScroll.resize);
    }
  },

  // Request update using requestAnimationFrame
  requestTick() {
    if(!ticking) {
      requestAnimationFrame(revealOnScroll.update);
    }
    ticking = true;
  },

  // Update image reveal
  update() {
    ticking = false;
    scrollTop = $window.scrollTop();
    // Loop through each reveal image and check if in viewport
    reveals.forEach((el, i) => {
      if (el.getBoundingClientRect().top + window.scrollY <= (scrollTop + windowHeight - (windowHeight * 0.03)) && !activated[i]) {
        el.classList.add('-active');
        activated[i] = 1;
      }
    });
  },

  // Resize, recalculate positions
  resize(event) {
    windowHeight = $window.height();
  },

  // Scrolling
  scrolling(event) {
    revealOnScroll.requestTick();
  }

};

export default revealOnScroll
