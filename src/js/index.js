const tabsGenerator = (wrapEl, opts = {
  defaultTab: 1
}) => {
  if (!wrapEl) return console.log('There is no tabs container');

  const DEFAULT_SELECTOR = 'data-tab-id';
  const ACTIVE_CLASS = 'active';

  const wrapper = document.querySelectorAll(wrapEl)[0];

  const header = wrapper.querySelectorAll('.tabs__header')[0];
  const content = wrapper.querySelectorAll('.tabs__content')[0];

  const tabs = header.querySelectorAll(`[${DEFAULT_SELECTOR}]`);
  const tabsContent = content.querySelectorAll(`[${DEFAULT_SELECTOR}]`);

  const clearContent = () => {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove(ACTIVE_CLASS);
    }

    for (let i = 0; i < tabsContent.length; i++) {
      tabsContent[i].classList.remove(ACTIVE_CLASS);
    }
  };

  const addListeners = () => {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', onTabsChange);
    }
  };

  const onTabsChange = e => {
    e.preventDefault();

    const target = e.target.dataset.tabId || e.target.parentElement.dataset.tabId;
    clearContent();

    tabs[target - 1].classList.add(ACTIVE_CLASS);
    tabsContent[target - 1].classList.add(ACTIVE_CLASS);
  };

  /**
   * Init
   */
  addListeners();
  clearContent();

  tabs[opts.defaultTab - 1].classList.add(ACTIVE_CLASS);
  tabsContent[opts.defaultTab - 1].classList.add(ACTIVE_CLASS);
};

/**
 * Dropdown
 * */
const dropdownGenerator = (el) => {
  const onDropdown = () => {
    const dropdownList = el.nextElementSibling;
    if (dropdownList) {
      const isActive = dropdownList.classList.contains('active');
      if (isActive) {
        dropdownList.classList.remove('active');
      } else {
        dropdownList.classList.add('active');
      }
    }

    document.addEventListener('click', function (e) {
      const isClickInside = el.contains(e.target);

      if (!isClickInside) {
        dropdownList.className = 'dropdown-list';
      }
    });
  };

  el.addEventListener('click', onDropdown, false);
};

/**
 * Accordion
 */
const accordion = document.getElementsByClassName('accordion');

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active-accordion');
    const container = this.closest('.project');
    const panel = container.querySelector('.panel');
    if (panel.style.height) {
      panel.style.height = null;
    } else {
      panel.style.height = panel.scrollHeight + 'px';
    }
  });
}

window.onload = () => {

  /**
   * Init tabs
   */
  tabsGenerator('.js-tabs', {
    defaultTab: 1
  });

  /**
   * Init dropdowns
   */
  const dropdownButton = document.querySelectorAll('.js-dropdown');

  for (let i = 0; i < dropdownButton.length; i++) {
    dropdownGenerator(dropdownButton[i]);
  }
};