setInterval(() => {
  // Refresh main PowerBI frame
  const powerBIFrame = document.getElementById("powerbi-frame");
  if (powerBIFrame) powerBIFrame.src = powerBIFrame.src;
}, 300000);

// Toggle dropdowns on click (stay open until clicked again or outside click)
document.querySelectorAll('.has-sub > .toplink').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const li = e.currentTarget.closest('.has-sub');

    // Close any other open menus
    document.querySelectorAll('.has-sub.open').forEach(openLi => {
      if (openLi !== li) {
        openLi.classList.remove('open');
        openLi.querySelector('.sub').style.display = 'none';
      }
    });

    // Toggle this menu
    li.classList.toggle('open');
    const subMenu = li.querySelector('.sub');
    if (subMenu) {
      subMenu.style.display = li.classList.contains('open') ? 'block' : 'none';
    }
  });
});

// Close dropdown if clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav')) {
    document.querySelectorAll('.has-sub.open').forEach(openLi => {
      openLi.classList.remove('open');
      openLi.querySelector('.sub').style.display = 'none';
    });
  }
});
