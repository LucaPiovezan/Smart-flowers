// ===== STEM LINE =====
var stemLine = document.getElementById('stemLine');
if (stemLine) {
  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    stemLine.style.height = progress + '%';
  }, { passive: true });
}

// ===== HEADER SCROLL =====
var header = document.getElementById('header');
window.addEventListener('scroll', function () {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ===== MOBILE MENU =====
var menuToggle = document.getElementById('menuToggle');
var mobileMenu = document.getElementById('mobileMenu');
var hamburgerIcon = document.getElementById('hamburgerIcon');

if (menuToggle) {
  menuToggle.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      hamburgerIcon.textContent = '☰';
    } else {
      mobileMenu.classList.add('open');
      hamburgerIcon.textContent = '✕';
    }
  });
}

// Close mobile menu when a link is clicked
var mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
mobileLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
    hamburgerIcon.textContent = '☰';
  });
});

// ===== SCROLL REVEAL (clip-path) =====
function revealOnScroll() {
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var top = reveals[i].getBoundingClientRect().top;
    if (top < windowHeight - 40) {
      reveals[i].classList.add('visible');
    }
  }
}
window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);
// Also trigger on initial render
setTimeout(revealOnScroll, 100);

// ===== HORIZONTAL SCROLL PARALLAX (desktop only) =====
var horizontalScroll = document.getElementById('horizontalScroll');
if (horizontalScroll) {
  var isMobile = window.innerWidth < 768;

  window.addEventListener('resize', function() {
    isMobile = window.innerWidth < 768;
    if (isMobile) {
      horizontalScroll.style.transform = '';
    }
  });

  window.addEventListener('scroll', function () {
    if (isMobile) return; // native scroll on mobile, no transform

    var rect = horizontalScroll.parentElement.getBoundingClientRect();
    var windowHeight = window.innerHeight;
    var sectionHeight = rect.height;
    var progress = (windowHeight - rect.top) / (windowHeight + sectionHeight);
    progress = Math.max(0, Math.min(1, progress));
    var xOffset = 8 - (progress * 36);
    horizontalScroll.style.transform = 'translateX(' + xOffset + '%)';
  }, { passive: true });
}

// ===== HERO PARALLAX =====
var heroRose = document.getElementById('heroRose');
var heroContent = document.getElementById('heroContent');
var heroSection = document.getElementById('hero');

if (heroSection) {
  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var heroHeight = heroSection.offsetHeight;
    var progress = Math.min(scrollTop / heroHeight, 1);

    if (heroRose) {
      var scale = 1 - (progress * 0.4);
      var yOffset = -(progress * 120);
      heroRose.style.transform = 'translateY(' + yOffset + 'px) scale(' + scale + ')';
    }

    if (heroContent) {
      var titleScale = 1 - (progress * 0.35);
      var titleY = -(progress * 60);
      var opacity = 1 - (progress * 2.2);
      heroContent.style.transform = 'translateY(' + titleY + 'px) scale(' + titleScale + ')';
      heroContent.style.opacity = Math.max(0, opacity);
    }
  }, { passive: true });
}

// ===== TOUCH: smooth scroll snap feedback for horizontal =====
if (horizontalScroll) {
  var isScrolling;
  horizontalScroll.addEventListener('scroll', function() {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
      // snap ended
    }, 66);
  }, { passive: true });
}
