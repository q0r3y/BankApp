/**
 * Contains the methods necessary for the home page
 */

'use strict';

/*
import STATIC from "../../static.js";

class Home {

    _user;

    /!**
     *
     *!/
    constructor() {
        STATIC.updateUserSessionData().then( () => {
            this._user = JSON.parse(sessionStorage.getItem("user"));
            this.displayName().then(() => {
                this.displayBalance();
            });
        });
    }

    /!**
     *  Populates DOM elements with balances and account numbers
     * @returns {Promise<void>}
     *!/
    async displayBalance() {
        const $savingsAccountNumber = document.getElementById('savings-name');
        const $checkingAccountNumber =document.getElementById('checking-name');
        const $creditAccountNumber = document.getElementById('credit-name');

        const $savingsBalance = document.getElementById('savings-balance');
        const $checkingBalance = document.getElementById('checking-balance');
        const $creditBalance = document.getElementById('credit-balance');

        $savingsAccountNumber.innerText = `Savings Account: ${this._user.savings_account}`;
        $checkingAccountNumber.innerText = `Checking Account: ${this._user.checking_account}`;
        $creditAccountNumber.innerText = `Credit Card: ${this._user.credit_account}`;
        $savingsBalance.innerText = `$${Number(this._user.savings_balance).toFixed(2)}`;
        $checkingBalance.innerText = `$${Number(this._user.checking_balance).toFixed(2)}`;
        $creditBalance.innerText = `$${Number(this._user.credit_balance).toFixed(2)}`;
    }

    /!**
     *
     * @returns {Promise<void>}
     *!/
    async displayName() {
        const $welcomeName = document.getElementById('welcome-name');
        $welcomeName.innerText = `Welcome ${this._user.name}!`;
    }

}
{
    new Home();
}*/
