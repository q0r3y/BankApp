'use strict';

class Print {
  $printButton = document.getElementById('print-button');

  constructor() {
    this.printButtonListener();
    this.$printButton.disabled = true;
  }

  printButtonListener() {
    this.$printButton.addEventListener('click', async () => {
      const $printArea = document.getElementById('print-area');
      this.fillPrintArea($printArea);
      this.printReceipt($printArea);
    });
  }

  printReceipt($printArea) {
    const newWindow = window.open();
    newWindow.document.write($printArea.innerHTML);
    newWindow.print();
    this.$printButton.disabled = true;
  }

  fillPrintArea($printArea) {
    const $bank = document.createElement('p');
    const $date = document.createElement('p');
    const $memberId = document.createElement('p');
    const $shareId = document.createElement('p');
    const $transCode = document.createElement('p');
    const $amount = document.createElement('p');

    $bank.innerHTML = `Mr.Big's Bank`;
    $date.innerHTML = `Date: ${Date().toLocaleString()}`;
    $memberId.innerHTML =
      `Member ID: ${sessionStorage.getItem('selectedMemberId')}`;
    $shareId.innerHTML =
      `Share ID: ${sessionStorage.getItem('selectedShareId')}`;
    $transCode.innerHTML =
      `Transaction Code: ${sessionStorage.getItem('transCode')}`;
    $amount.innerHTML =
      `Amount: ${sessionStorage.getItem('lastTransactionValue')}`;

    $printArea.appendChild($bank);
    $printArea.appendChild($date);
    $printArea.appendChild($memberId);
    $printArea.appendChild($shareId);
    $printArea.appendChild($transCode);
    $printArea.appendChild($amount);
    $printArea.appendChild(document.createElement('p'));
  }
}

{
  new Print();
}
