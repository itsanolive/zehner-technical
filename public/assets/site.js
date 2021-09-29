const init = () => {
  // Calculate announcement bar and header height;
  const fullHeaderHeight = document.querySelector('.AnnouncementBar').scrollHeight + document.querySelector('.SiteHeader').scrollHeight + 'px',
    announcementHeight = document.querySelector('.AnnouncementBar').scrollHeight + 'px', 
    headerHeight = document.querySelector('.SiteHeader').scrollHeight + 'px';

  // Mobile menu drawer/overlay
  const drawerOpenEls = document.querySelectorAll('[data-action="open-drawer"]'),
    drawerCloseEls = document.querySelectorAll('[data-action="close-drawer"]');

  console.log('drawerOpenEls', drawerOpenEls);
  console.log('drawerCloseEls', drawerCloseEls);

  const drawerToggle = (e) => {
    const target = e.target.closest('[data-action]'),
      drawerAction = target.getAttribute('data-action'),
      drawerId = target.getAttribute('data-drawer'),
      drawerEl = document.getElementById(drawerId);

    if (drawerAction === 'open-drawer') {
      // show drawer, hide open element, show closest closest close element to trigger
      drawerEl.style.display = 'block';
      target.style.display = 'none';
      document.querySelector(`[data-action="close-drawer"][data-drawer="${drawerId}"]`).style.display = 'flex';
    } else if (drawerAction === 'close-drawer') {
      // hide drawer, show open element, hide close element
      drawerEl.style.display = 'none';
      target.style.display = 'none';
      document.querySelector(`[data-action="open-drawer"][data-drawer="${drawerId}"]`).style.display = 'flex';
    } else {
      console.error('Error: check drawer action config');
    }
  }

  drawerOpenEls.forEach(item => {
    item.addEventListener('click', drawerToggle);
  });

  drawerCloseEls.forEach(item => {
    item.addEventListener('click', drawerToggle);
  });

  // Header Dropdowns - Desktop
  // Keep overlay open on mouseover, close on exit
  const menuDropdownKeep = (e) => {
    const context = e.type,
      dropdownArea = e.target;
    if (context === 'mouseover') {
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
      showMenu.setAttribute('style', `display: flex; top: ${fullHeaderHeight};`);
    } else {
      showMenu.setAttribute('style', 'display: none;');
    }
  }

  const headerDropdowns = document.querySelectorAll('.SiteHeader [data-action="dropdown"]'),
    headerDropdownOverlays = document.querySelectorAll('.Header__DesktopOverlay');

  headerDropdowns.forEach(item => {
    item.addEventListener('mouseover', menuDropdown);
    item.addEventListener('mouseleave', menuDropdown);
  });

  headerDropdownOverlays.forEach(item => {
    if (item.style.display === 'flex') {
      item.addEventListener('mouseover', menuDropdownKeep);
      item.addEventListener('mouseleave', menuDropdownKeep);
    }
  });

  // SEARCH BAR SHOW/HIDE
  const searchIcon = document.querySelectorAll('[data-action="searchbar"]'),
    searchBarEl = document.querySelector('.HeaderSearchBar'),
    searchBarInput = document.querySelector('.HeaderSearchBar__Input'),
    searchBarClose = document.querySelector('[data-action="closeSearchBar"]');

  const showSearchBar = () => {
    searchBarEl.style.display = 'block';
    searchBarEl.style.top = announcementHeight;
    searchBarEl.style.height = headerHeight;

    searchBarClose.addEventListener('click', () => {
      searchBarEl.style.display = 'none';
    })

    // placeholder for predictive search
    // searchBarInput.addEventListener('change', () => {
    //   console.log('predictive search update placeholder');
    // })
  }
  searchIcon.forEach(item => {
    item.addEventListener('click', showSearchBar);
  });
}

window.onload = init;
