'use strict';
import STATIC from '../../static.js';

class NewUser {
  constructor() {
    STATIC.disableEnterKey();
    this.populateRandomUserData();
    this.newUserEventListener();
    this.newUserCheckBoxListener();
    this.beneficiaryCheckBoxListener();
  }

  newUserCheckBoxListener() {
    const $emailInput = document.getElementById('email-input');
    const $passwordInput = document.getElementById('password-input');
    const $userCheckBox = document.getElementById('create-user-check');
    $userCheckBox.checked = true;

    $userCheckBox.onchange = function() {
      $emailInput.disabled = !this.checked;
      $passwordInput.disabled = !this.checked;
    };
  }

  beneficiaryCheckBoxListener() {
    const $beneficiaryCheckBox = document.getElementById('beneficiary-check');
    const $bfirstnameinput = document.getElementById('b-first-name-input');
    const $blastnameinput = document.getElementById('b-last-name-input');
    const $bbirthdateinput = document.getElementById('b-birth-date-input');
    const $baddressinput = document.getElementById('b-address-input');
    const $bcityinput = document.getElementById('b-city-input');
    const $bstateinput = document.getElementById('b-state-input');
    const $bzipinput = document.getElementById('b-zip-input');
    const $bphonenumberinput = document.getElementById('b-phone-number-input');
    const $bssninput = document.getElementById('b-ssn-input');
    $beneficiaryCheckBox.checked = false;

    $beneficiaryCheckBox.onchange = async function() {
      $bfirstnameinput.disabled = !this.checked;
      $blastnameinput.disabled = !this.checked;
      $bbirthdateinput.disabled = !this.checked;
      $baddressinput.disabled = !this.checked;
      $bcityinput.disabled = !this.checked;
      $bstateinput.disabled = !this.checked;
      $bzipinput.disabled = !this.checked;
      $bphonenumberinput.disabled = !this.checked;
      $bssninput.disabled = !this.checked;

      $bfirstnameinput.value = '';
      $blastnameinput.value = '';
      $bbirthdateinput.value = '';
      $baddressinput.value = '';
      $bcityinput.value = '';
      $bstateinput.value = '';
      $bzipinput.value = '';
      $bphonenumberinput.value = '';
      $bssninput.value = '';

      if (this.checked) {
        const fakeUserData = await fetch('https://random-data-api.com/api/users/random_user');
        fakeUserData.json().then((data) => {
          $bfirstnameinput.value = data['first_name'];
          $blastnameinput.value = data['last_name'];
          $bbirthdateinput.value = data['date_of_birth'];
          $baddressinput.value = data['address']['street_address'];
          $bcityinput.value = data['address']['city'];
          $bstateinput.value = data['address']['state'];
          $bzipinput.value = data['address']['zip_code'];
          $bphonenumberinput.value = data['phone_number'];
          $bssninput.value = data['social_insurance_number'];
        });
      }
    };
  }

  newUserEventListener() {
    const $submitButton = document.getElementById('new-user-submit');
    const $messageText = document.getElementById('message-text');

    $submitButton.addEventListener('click', async () => {
      const $newUserForm = new FormData(document.getElementById('new-user-form'));
      const $emailInput = document.getElementById('email-input').value;
      const $passwordInput = document.getElementById('password-input').value;
      const $newUserCheckBox = document.getElementById('create-user-check');
      const $beneficiaryCheckBox = document.getElementById('beneficiary-check');

      let beneficiaryData;
      const userData = {
        'firstName': $newUserForm.get('first-name'),
        'lastName': $newUserForm.get('last-name'),
        'birthDate': $newUserForm.get('birth-date'),
        'streetAddress': $newUserForm.get('street-address'),
        'city': $newUserForm.get('city'),
        'state': $newUserForm.get('state'),
        'zip': $newUserForm.get('zip'),
        'phoneNumber': $newUserForm.get('phone-number'),
        'ssn': $newUserForm.get('ssn'),
      };

      if ($beneficiaryCheckBox.checked) {
        beneficiaryData = {
          'firstName': $newUserForm.get('b-first-name'),
          'lastName': $newUserForm.get('b-last-name'),
          'birthDate': $newUserForm.get('b-birth-date'),
          'streetAddress': $newUserForm.get('b-street-address'),
          'city': $newUserForm.get('b-city'),
          'state': $newUserForm.get('b-state'),
          'zip': $newUserForm.get('b-zip'),
          'phoneNumber': $newUserForm.get('b-phone-number'),
          'ssn': $newUserForm.get('b-ssn'),
        };
        userData.beneficiary = beneficiaryData;
      }

      if ($newUserCheckBox.checked) {
        if ($emailInput.length > 0 || $passwordInput.length > 0) {
          userData.email = $newUserForm.get('email');
          userData.password = $newUserForm.get('password');
        }
      }

      $messageText.innerText = 'Running credit scan please wait...';
      const userDataJsonString = JSON.stringify(userData);
      console.log(userDataJsonString);
      const isUserCreated = await STATIC.performFetch('/api/private/create', userDataJsonString);
      isUserCreated.json().then((data) => {
        console.log(data);
        $messageText.innerText = '';
        if (data.status === 'success') {
          $messageText.innerText = data['msg'];
          setTimeout(() => {
            window.location.href = '/teller/home';
          }, 2000);
        } else {
          $messageText.innerText += data.errors['0'].param || ' ';
          $messageText.innerText += data.errors['0'].msg;
        }
      });
    });
  }

  async populateRandomUserData() {
    const fakeUserData = await fetch('https://random-data-api.com/api/users/random_user');
    fakeUserData.json().then((data) => {
      console.log(data);
      document.getElementById('first-name-input').value = data['first_name'];
      document.getElementById('last-name-input').value = data['last_name'];
      document.getElementById('birth-date-input').value = data['date_of_birth'];
      document.getElementById('address-input').value = data['address']['street_address'];
      document.getElementById('city-input').value = data['address']['city'];
      document.getElementById('state-input').value = data['address']['state'];
      document.getElementById('zip-input').value = data['address']['zip_code'];
      document.getElementById('phone-number-input').value = data['phone_number'];
      document.getElementById('ssn-input').value = data['social_insurance_number'];
      document.getElementById('email-input').value = data['email'];
      document.getElementById('password-input').value = data['password'];
    });
  }

}

{
  new NewUser();
}
