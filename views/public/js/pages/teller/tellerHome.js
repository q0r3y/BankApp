'use strict';

class TellerHome {
  constructor() {
    TellerHome.newAccountListener();
    TellerHome.withdrawalListener();
    TellerHome.depositListener();
    TellerHome.transferListener();
    TellerHome.statementListener();
    TellerHome.uploadListener();
    TellerHome.logoutListener();
  }

  static newAccountListener() {
    const $openNewAccountButton = document.getElementById('new-account-button');
    $openNewAccountButton.addEventListener('click', () => {
      console.log(`Open new account`);
      document.location.href = '/teller/newmember';
    });
  }

  static withdrawalListener() {
    const $withdrawalButton = document.getElementById('withdrawal-button');
    $withdrawalButton.addEventListener('click', () => {
      console.log(`Withdrawal`);
      document.location.href = '/teller/withdrawal';
    });
  }

  static depositListener() {
    const $depositButton = document.getElementById('deposit-button');
    $depositButton.addEventListener('click', () => {
      console.log(`Deposit`);
      document.location.href = '/teller/deposit';
    });
  }

  static transferListener() {
    const $transferButton = document.getElementById('transfer-button');
    $transferButton.addEventListener('click', () => {
      console.log(`Transfer`);
      document.location.href = '/teller/custom';
    });
  }

  static statementListener() {
    const $statementButton = document.getElementById('statement-button');
    $statementButton.addEventListener('click', () => {
      console.log(`Statement`);
      document.location.href = '/teller/statements';
    });
  }

  static uploadListener() {
    const $uploadButton = document.getElementById('upload-button');
    $uploadButton.addEventListener('click', () => {
      console.log(`Upload`);
      document.location.href = '/teller/upload';
    });
  }

  static logoutListener() {
    const $logoutButton = document.getElementById('logout-button');
    $logoutButton.addEventListener('click', () => {
      document.location.href = '/teller/logout';
    });
  }
}

{
  new TellerHome();
}
