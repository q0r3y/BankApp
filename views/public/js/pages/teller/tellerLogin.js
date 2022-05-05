'use strict';
import STATIC from '../../static.js';

class Login {
  constructor() {
    this.loginEventListener();
  }

  loginEventListener() {
    const $loginButton = document.getElementById('login-button');
    const $messageText = document.getElementById('message-text');

    $loginButton.addEventListener('click', async () => {
      const loginForm = new FormData(document.getElementById(`login-form`));
      const email = loginForm.get('email');
      const password = loginForm.get('password');

      const loginData = {
        'email': email,
        'password': password,
      };

      const loginDataJsonString = JSON.stringify(loginData);
      const isValidLogin = await STATIC.performFetch(`/api/public/login`, loginDataJsonString);

      isValidLogin.json().then((data) => {
        console.log(data);
        if (data.status === 'success') {
          if (data.msg.userType === 'teller') {
            window.location.href = '/teller/home';
          }
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
