/**
 * Controls the actions of the menubar buttons
 */

'use strict';

export default class Menubar {
  constructor() {
    Menubar.homeButtonListener();
    Menubar.logoutButtonListener();
  }

  static homeButtonListener() {
    const $transferButton = document.getElementById('home-button');
    $transferButton.addEventListener('click', () => {
      document.location.href = '/teller/home';
    });
  }

  static logoutButtonListener() {
    const $logoutButton = document.getElementById('logout-button');
    $logoutButton.addEventListener('click', () => {
      sessionStorage.clear();
      document.location.href = '/teller/logout';
    });
  }
}
{
  new Menubar();
}
