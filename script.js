document.addEventListener('DOMContentLoaded', function() {
  // Get all sections
  const sections = document.querySelectorAll('section');

  // Create an intersection observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When the section is in view, fade it in
        entry.target.classList.add('fade-in');
        entry.target.classList.remove('fade-out');
      } else {
        // When the section is out of view, fade it out
        entry.target.classList.add('fade-out');
        entry.target.classList.remove('fade-in');
      }
    });
  }, { threshold: 0.1 }); // Adjust threshold to trigger effect sooner or later

  // Observe each section
  sections.forEach(section => observer.observe(section));
});