setInterval(() => {
  // Refresh main PowerBI frame
  const powerBIFrame = document.getElementById("powerbi-frame");
  if (powerBIFrame) powerBIFrame.src = powerBIFrame.src;
}, 300000);

// Toggle dropdowns on click (stay open until clicked again or outside click)
document.querySelectorAll(".has-sub > .toplink").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const li = e.currentTarget.closest(".has-sub");

    // Close any other open menus
    document.querySelectorAll(".has-sub.open").forEach((openLi) => {
      if (openLi !== li) {
        openLi.classList.remove("open");
        openLi.querySelector(".sub").style.display = "none";
      }
    });

    // Toggle this menu
    li.classList.toggle("open");
    const subMenu = li.querySelector(".sub");
    if (subMenu) {
      subMenu.style.display = li.classList.contains("open") ? "block" : "none";
    }
  });
});

// Close dropdown if clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav")) {
    document.querySelectorAll(".has-sub.open").forEach((openLi) => {
      openLi.classList.remove("open");
      openLi.querySelector(".sub").style.display = "none";
    });
  }
});

class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
         <header class="topbar">
      <div class="brand">
        <img src="renaissance-logo-full-color-rgb.svg" alt="Renaissance Repair & Supply" class="brand-logo" />
      </div>
      <!-- Desktop Navigation -->
      <div class="bar-inner">
        <nav class="nav" aria-label="Main">
          <ul class="menu">
            <li class="has-sub">
              <a href="#" class="toplink">OTD Dashboards</a>
              <ul class="sub">
                <li><a href="index.html" class="active">All Departments</a></li>
              </ul>
            </li>

            <!-- KPIs -->
            <li class="has-sub">
              <a href="#" class="toplink">Departments</a>
              <ul class="sub">
                <li><a href="operations.html">Operations</a></li>
                <li><a href="engineering.html">Engineering</a></li>
                <li><a href="supplychain.html">Supply Chain</a></li>
                <li><a href="quality.html" class="active">Quality</a></li>
                <li><a href="dashboards.html">Dashboards</a></li>
              </ul>
            </li>

            <!-- Applications -->
            <li class="has-sub">
              <a href="#" class="toplink">Applications</a>
              <ul class="sub">
                <li><a href="palletsApp.html">Pallet Receiving Tool</a></li>
                <li><a href="skuDetailsApp.html">SKU Update Tool</a></li>
                <li><a href="customerHoldApp.html">Customer Hold Tool</a></li>
                <li><a href="npi-tool.html">NPI Update Tool</a></li>
                <li><a href="BatchUpdate.html">Work Order Update Tool</a></li>
              </ul>
            </li>
            <!-- TV Reports -->
            <li class="has-sub">
              <a href="#" class="toplink">TV Reports</a>
              <ul class="sub">
                <li><a href="ROG-TEST-TV.html">Rogue-Test</a></li>
                <li><a href="ROG-DEBUG-TV.html">Rogue-Debug</a></li>
                <li><a href="RUN-TEST-TV.html">Run-Test</a></li>
                <li><a href="RUN-DEBUG-TV.html">Run-Debug</a></li>
              </ul>
            </li>
            <!-- Floor Tools -->
            <li class="has-sub">
              <a href="#" class="toplink">Floor Tools</a>
              <ul class="sub">
                <li><a href="lookuptool.html">Look-Up Tool</a></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Right side with Mobile Menu -->
      <div class="header-right">
        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" onclick="closeMobileMenu()"></div>

    <!-- Mobile Menu Panel -->
    <div class="mobile-menu-panel">
      <div class="mobile-menu-header">
        <h3 class="mobile-menu-title">Navigation</h3>
        <button class="mobile-menu-close" onclick="closeMobileMenu()">×</button>
      </div>
      <div class="mobile-menu-content">
        <!-- OTD Dashboards Section -->
        <div class="mobile-menu-section collapsed">
          <h4 class="mobile-menu-section-title" onclick="toggleMobileSection(this)">OTD Dashboards</h4>
          <div class="mobile-menu-items">
            <a href="index.html" class="mobile-menu-item active" onclick="closeMobileMenu()">Combined OTD Report</a>
          </div>
        </div>

        <!-- KPIs Section -->
        <div class="mobile-menu-section collapsed">
          <h4 class="mobile-menu-section-title" onclick="toggleMobileSection(this)">Departments</h4>
          <div class="mobile-menu-items">
            <a href="operations.html" class="mobile-menu-item" onclick="closeMobileMenu()">Operations</a>
            <a href="engineering.html" class="mobile-menu-item" onclick="closeMobileMenu()">Engineering</a>
            <a href="supplychain.html" class="mobile-menu-item" onclick="closeMobileMenu()">Supply Chain</a>
            <a href="quality.html" class="mobile-menu-item active" onclick="closeMobileMenu()">Quality</a>
            <a href="dashboards.html" class="mobile-menu-item" onclick="closeMobileMenu()">Dashboards</a>
          </div>
        </div>

        <!-- Applications Section -->
        <div class="mobile-menu-section collapsed">
          <h4 class="mobile-menu-section-title" onclick="toggleMobileSection(this)">Applications</h4>
          <div class="mobile-menu-items">
            <a href="palletsApp.html" class="mobile-menu-item" onclick="closeMobileMenu()">Pallet Receiving Tool</a>
            <a href="skuDetailsApp.html" class="mobile-menu-item" onclick="closeMobileMenu()">SKU Update Tool</a>
            <a href="customerHoldApp.html" class="mobile-menu-item" onclick="closeMobileMenu()">Customer Hold Tool</a>
            <a href="npi-tool.html" class="mobile-menu-item" onclick="closeMobileMenu()">NPI Update Tool</a>
            <a href="BatchUpdate.html" class="mobile-menu-item" onclick="closeMobileMenu()">Work Order Update Tool</a>
          </div>
        </div>

        <!-- TV Reports Section -->
        <div class="mobile-menu-section collapsed">
          <h4 class="mobile-menu-section-title" onclick="toggleMobileSection(this)">TV Reports</h4>
          <div class="mobile-menu-items">
            <a href="ROG-TEST-TV.html" class="mobile-menu-item" onclick="closeMobileMenu()">Rogue-Test</a>
            <a href="ROG-DEBUG-TV.html" class="mobile-menu-item" onclick="closeMobileMenu()">Rogue-Debug</a>
            <a href="RUN-TEST-TV.html" class="mobile-menu-item" onclick="closeMobileMenu()">Run-Test</a>
            <a href="RUN-DEBUG-TV.html" class="mobile-menu-item" onclick="closeMobileMenu()">Run-Debug</a>
          </div>
        </div>

        <!-- Floor Tools Section -->
        <div class="mobile-menu-section collapsed">
          <h4 class="mobile-menu-section-title" onclick="toggleMobileSection(this)">Floor Tools</h4>
          <div class="mobile-menu-items">
            <a href="lookuptool.html" class="mobile-menu-item" onclick="closeMobileMenu()">Look-Up Tool</a>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define("special-header", SpecialHeader);
