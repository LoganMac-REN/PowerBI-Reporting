// ================================================
// Renaissance Repair & Supply - Mobile Menu JavaScript
// Version: 1.0 - September 2025
// ================================================

// Mobile Menu Functions
function toggleMobileMenu() {
  document.body.classList.toggle('mobile-menu-open');
}

function closeMobileMenu() {
  document.body.classList.remove('mobile-menu-open');
}

// Mobile Menu Section Toggle Function
function toggleMobileSection(titleElement) {
  const section = titleElement.parentElement;
  section.classList.toggle('collapsed');
}

// Initialize mobile menu sections - start with all collapsed except current page section
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.mobile-menu-section');
  sections.forEach(section => {
    // Collapse all sections initially
    section.classList.add('collapsed');
    
    // Keep the section open if it contains the active page
    const activeItem = section.querySelector('.mobile-menu-item.active');
    if (activeItem) {
      section.classList.remove('collapsed');
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
  
  // Close mobile menu if clicking outside
  if (mobileMenuToggle && !mobileMenuToggle.contains(event.target) && 
      mobileMenuPanel && !mobileMenuPanel.contains(event.target)) {
    document.body.classList.remove('mobile-menu-open');
  }
});

// Close mobile menu on window resize if screen becomes large
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    document.body.classList.remove('mobile-menu-open');
  }
});
