'use strict';

var tabsGenerator = function tabsGenerator(wrapEl) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    defaultTab: 1
  };

  if (!wrapEl) return console.log('There is no tabs container');

  var DEFAULT_SELECTOR = 'data-tab-id';
  var ACTIVE_CLASS = 'active';

  var wrapper = document.querySelectorAll(wrapEl)[0];

  var header = wrapper.querySelectorAll('.tabs__header')[0];
  var content = wrapper.querySelectorAll('.tabs__content')[0];

  var tabs = header.querySelectorAll('[' + DEFAULT_SELECTOR + ']');
  var tabsContent = content.querySelectorAll('[' + DEFAULT_SELECTOR + ']');

  var clearContent = function clearContent() {
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove(ACTIVE_CLASS);
    }

    for (var _i = 0; _i < tabsContent.length; _i++) {
      tabsContent[_i].classList.remove(ACTIVE_CLASS);
    }
  };

  var addListeners = function addListeners() {
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', onTabsChange);
    }
  };

  var onTabsChange = function onTabsChange(e) {
    e.preventDefault();

    var target = e.target.dataset.tabId || e.target.parentElement.dataset.tabId;
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
var dropdownGenerator = function dropdownGenerator(el) {
  var onDropdown = function onDropdown() {
    var dropdownList = el.nextElementSibling;
    if (dropdownList) {
      var isActive = dropdownList.classList.contains('active');
      if (isActive) {
        dropdownList.classList.remove('active');
      } else {
        dropdownList.classList.add('active');
      }
    }

    document.addEventListener('click', function (e) {
      var isClickInside = el.contains(e.target);

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
var accordion = document.getElementsByClassName('accordion');

for (var i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active-accordion');
    var container = this.closest('.project');
    var panel = container.querySelector('.panel');
    if (panel.style.height) {
      panel.style.height = null;
    } else {
      panel.style.height = panel.scrollHeight + 'px';
    }
  });
}

window.onload = function () {

  /**
   * Init tabs
   */
  tabsGenerator('.js-tabs', {
    defaultTab: 1
  });

  /**
   * Init dropdowns
   */
  var dropdownButton = document.querySelectorAll('.js-dropdown');

  for (var _i2 = 0; _i2 < dropdownButton.length; _i2++) {
    dropdownGenerator(dropdownButton[_i2]);
  }
};