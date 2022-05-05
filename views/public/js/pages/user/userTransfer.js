/**
 * Contains the methods necessary for the Transfer page
 */
'use strict';

class Transfer {
  _user;

  /**
   *
   */
  constructor() {
    this.setDropDownMenu();
    this.transferListener();
  }

  /**
   * Populates the account choice drop down menu
   */
  setDropDownMenu() {
    const $savingsDropDown = document.getElementById('savings-drop-down');
    const $checkingDropDown = document.getElementById('checking-drop-down');
    const $creditDropDown = document.getElementById('credit-drop-down');

    $savingsDropDown.innerText = `Savings ${this._user.savings_account} - ${Number(this._user.savings_balance).toFixed(2)}`;
    $checkingDropDown.innerText = `Checking ${this._user.checking_account} - ${Number(this._user.checking_balance).toFixed(2)}`;
    $creditDropDown.innerText = `Credit ${this._user.credit_account} - ${Number(this._user.credit_balance).toFixed(2)}`;

    $savingsDropDown.value = `${this._user.savings_account}`;
    $checkingDropDown.value = `${this._user.checking_account}`;
    $creditDropDown.value = `${this._user.credit_account}`;
  }

  /**
   * Listens for clicks on the transfer submit button
   */
  transferListener() {
    const $transferSubmit = document.getElementById('transfer-submit');
    $transferSubmit.addEventListener('click', async () => {
      const transferForm = new FormData(document.getElementById(`transfer-form`));
      const transferFromAccount = transferForm.get('transfer-from-account').match(/\d+/)[0];
      const transferToAccount = transferForm.get('transfer-to-account');
      const transferAmount = transferForm.get('transfer-amount');
      const transferData = {
        'transfer_from': transferFromAccount,
        'transfer_to': transferToAccount,
        'transferAmount': transferAmount,
      };
      const transferDataJsonString = JSON.stringify(transferData);
      const transferStatus = await STATIC.performFetch(transferDataJsonString, 'fetch.transfer');

      if (transferStatus === 'true') {
        STATIC.setMessageText('Transfer Successful', true, '/home');
      } else {
        STATIC.setMessageText('Unable to transfer funds', true, '/home');
      }
    });
  }

  setMessageText(message, redirect) {
    const messageTextElement = document.getElementById('message-text');
    messageTextElement.innerText = `Transfer was successful!`;

    setTimeout(() => {
      document.location.href = '/home';
    }, 1250);
  }
}

{
  new Transfer();
}
