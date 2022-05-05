'use strict';

class Index {
  constructor() {
    this.userLinkListener();
    this.tellerLinkListener();
  }

  userLinkListener() {
    const $newUserButton = document.getElementById('user-button');
    $newUserButton.addEventListener('click', () => {
      document.location.href = '/user/login';
    });
  }

  tellerLinkListener() {
    const $newUserButton = document.getElementById('teller-button');
    $newUserButton.addEventListener('click', () => {
      document.location.href = '/teller/login';
    });
  }
}

{
  new Index();
}
