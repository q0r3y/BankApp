'use strict';

import STATIC from '../../static.js';

// TODO: Remove email and password ||

class Login {
  constructor() {
    this.loginEventListener();
  }

  loginEventListener() {
    const $loginButton = document.getElementById('login-button');
    const $messageText = document.getElementById('message-text');

    $loginButton.addEventListener('click', async () => {
      const loginForm = new FormData(document.getElementById(`login-form`));
      const email = loginForm.get('email') || 'valentine.mueller@email.com';
      const password = loginForm.get('password') || '86N0dseqtJ';

      const loginData = {
        'email': email,
        'password': password,
      };

      const loginDataJsonString = JSON.stringify(loginData);
      const isValidLogin = await STATIC.performFetch(`/api/public/login`, loginDataJsonString);

      isValidLogin.json().then((data) => {
        console.log(data);
        if (data.status === 'success') {
          window.location.href = '/user/home';
        } else {
          $messageText.innerText = 'Invalid Login';
        }
      });
    });
  }
}

{
  new Login();
}
