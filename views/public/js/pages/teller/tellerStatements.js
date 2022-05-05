'use strict';

import STATIC from '../../static.js';

class TellerStatements {
  $toDate = document.getElementById(`date-to`);
  $fromDate = document.getElementById(`date-from`);
  $csvButton = document.getElementById('csv-button');
  $printArea = document.getElementById('print-area');
  $printButton = document.getElementById('print-button');
  csvRows = ['TransactionID,MemberID,Share,Amount,TransactionCode,DateTime'];

  constructor() {
    console.log(`New teller statements`);
    this.$printButton.disabled = true;
    this.$csvButton.disabled = true;
    this.autoFillStartDate();
    this.generateButtonListener();
    this.printButtonListener();
    this.csvButtonListener();
  }

  // https://stackoverflow.com/a/49483299
  autoFillStartDate() {
    let f = new Date();
    this.$fromDate.valueAsDate = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 12);
    this.$toDate.valueAsDate = new Date(f.getFullYear(), f.getMonth(), f.getDate(), 12);
  }

  csvButtonListener() {
    this.$csvButton.addEventListener('click', () => {
      const csvData = this.csvRows.join('\n');
      const blob = new Blob([csvData], {type: 'text/csv'});
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'report.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  generateButtonListener() {
    const $generateButton = document.getElementById('generate-button');
    $generateButton.addEventListener('click', async () => {
      const $messageResponse = document.getElementById('message-response');
      const selectedMember = sessionStorage.getItem('selectedMemberId');
      const selectedShare = sessionStorage.getItem('selectedShareId');
      this.$printArea.innerHTML = '';

      if (selectedMember && selectedShare) {
        const statementQuery = JSON.stringify(
          {
            'memberId': selectedMember,
            'shareCode': selectedShare,
            'fromDateEpoch': new Date(this.$fromDate.value).getTime(),
            'toDateEpoch': new Date(this.$toDate.value).getTime(),
          },
        );

        const response =
          await STATIC.performFetch('/api/private/statements', statementQuery);
        response.json().then((data) => {
          if (data['status'] === 'success') {
            for (let i = 0; i < data['msg'].length; i++) {
              this.addToPrintArea(data['msg'][i]);
              this.addToCsv(data['msg'][i]);
            }
            this.$printButton.disabled = false;
            this.$csvButton.disabled = false;
          }
        });
      } else if (!selectedMember) {
        $messageResponse.innerText = `Please select a member`;
      } else if (!selectedShare) {
        $messageResponse.innerText = `Please select a share`;
      }
    });
  }

  addToCsv(data) {
    const dataValues = Object.values(data);
    this.csvRows.push(dataValues.join(','));
  }

  addToPrintArea(data) {
    const $bank = document.createElement('p');
    const $transactionId = document.createElement('p');
    const $date = document.createElement('p');
    const $memberId = document.createElement('p');
    const $shareId = document.createElement('p');
    const $transCode = document.createElement('p');
    const $amount = document.createElement('p');

    $bank.innerHTML = `-------------------Mr.Big's Bank-------------------`;
    $date.innerHTML = `Date: ${new Date(data['dateTime']).toLocaleString()}`;
    $transactionId.innerHTML = `Transaction ID: ${data['transactionId']}`;
    $memberId.innerHTML =
      `Member ID: ${data['memberId']}`;
    $shareId.innerHTML =
      `Share Code: ${data['shareCode']}`;
    $transCode.innerHTML =
      `Transaction Code: ${data['transCode']}`;
    $amount.innerHTML =
      `Amount: ${data['amount']}`;

    this.$printArea.appendChild($bank);
    this.$printArea.appendChild($date);
    this.$printArea.appendChild($transactionId);
    this.$printArea.appendChild($memberId);
    this.$printArea.appendChild($shareId);
    this.$printArea.appendChild($transCode);
    this.$printArea.appendChild($amount);
    this.$printArea.appendChild(document.createElement('p'));
  }

  printButtonListener() {
    this.$printButton.addEventListener('click', () => {
      const newWindow = window.open();
      newWindow.document.write(this.$printArea.innerHTML);
      newWindow.print();
    });
  }
}

{
  new TellerStatements();
}
