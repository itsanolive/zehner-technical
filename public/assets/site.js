const init = () => {
  // Calculate announcement bar and header height;
  const headerHeight = document.querySelector('.AnnouncementBar').scrollHeight + document.querySelector('.SiteHeader').scrollHeight + 'px';
  console.log('headerHeight', headerHeight);

  // Header Dropdowns
  // Keep overlay open on mouseover, close on exit
  const menuDropdownKeep = (e) => {
    const context = e.type,
      dropdownArea = e.target;
    if (context === 'mouseover') {
      console.log('mouseover dropdown area');
      dropdownArea.style.display = 'flex';
    } else {
      dropdownArea.setAttribute('style', 'display: none;');
    }
  };

  // Show overlay on mouseover of dropdown link, close on exit, set overlay area for mouseover check
  const menuDropdown = (e) => {
    const context = e.type,
      overlayId = e.target.getAttribute('data-dropdown'),
      showMenu = document.getElementById(overlayId);

    showMenu.addEventListener('mouseover', menuDropdownKeep);
    showMenu.addEventListener('mouseleave', menuDropdownKeep);

    if (context === 'mouseover') {
      // console.log('mouseover dropdown link');
      showMenu.setAttribute('style', `display: flex; top: ${headerHeight};`);
    } else {
      showMenu.setAttribute('style', 'display: none;');
      // console.log('mouse leave dropdown link');
      // setTimeout(function () {
      //   showMenu.setAttribute('style', 'display: none;');
      // }, 500);
    }
  }

  const headerDropdowns = document.querySelectorAll('.SiteHeader [data-action="dropdown"]'),
    headerDropdownOverlays = document.querySelectorAll('.Header__DesktopOverlay');

  headerDropdowns.forEach(item => {
    item.addEventListener('mouseover', menuDropdown);
    item.addEventListener('mouseleave', menuDropdown);
  });

  console.log('headerDropdownOverlays', headerDropdownOverlays);
  headerDropdownOverlays.forEach(item => {
    if (item.style.display === 'flex') {
      item.addEventListener('mouseover', menuDropdownKeep);
      item.addEventListener('mouseleave', menuDropdownKeep);
    }
  });

  // SEARCH BAR SHOW/HIDE
  const searchIcon = document.querySelectorAll('[data-action="searchbar"]');
  const showSearchBar = () => {
    console.log('show search bar');
  }
  searchIcon.forEach(item => {
    item.addEventListener('click', showSearchBar);
  });
}

window.onload = init;
