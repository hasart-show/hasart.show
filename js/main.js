(function () {
  'use strict';

  // Countdown
  var countdown = document.getElementById('countdown');
  if (countdown) {
    var target = new Date(countdown.getAttribute('data-target')).getTime();
    var status = document.getElementById('countdown-status');
    var fields = {};
    ['days', 'hours', 'minutes', 'seconds'].forEach(function (unit) {
      fields[unit] = countdown.querySelector('[data-unit="' + unit + '"]');
    });

    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    var timer;

    var tick = function () {
      var diff = target - Date.now();
      if (isNaN(diff) || diff <= 0) {
        fields.days.textContent = fields.hours.textContent = fields.minutes.textContent = fields.seconds.textContent = '00';
        if (status) status.textContent = isNaN(diff) ? 'Date coming soon' : "It's showtime";
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      fields.days.textContent = Math.floor(s / 86400);
      fields.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      fields.minutes.textContent = pad(Math.floor((s % 3600) / 60));
      fields.seconds.textContent = pad(s % 60);
    };

    tick();
    timer = setInterval(tick, 1000);
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Gallery lightbox
  var lightbox = document.getElementById('lightbox');
  if (lightbox && typeof lightbox.showModal === 'function') {
    var lbImg = lightbox.querySelector('img');

    document.querySelectorAll('.gallery-item img').forEach(function (img) {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      var open = function () {
        var srcset = img.getAttribute('srcset');
        // Use the largest source in the lightbox
        var largest = srcset ? srcset.split(',').pop().trim().split(/\s+/)[0] : img.currentSrc || img.src;
        lbImg.src = largest;
        lbImg.alt = img.alt;
        lightbox.showModal();
      };
      img.addEventListener('click', open);
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) lightbox.close();
    });
  }
})();
