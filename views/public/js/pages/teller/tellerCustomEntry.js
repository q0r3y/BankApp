'use strict';

import STATIC from '../../static.js';

class CustomEntry {
  numberOfCustomEntries = 1;
  $addEntryButton = document.getElementById('add-entry-button');
  $submitButton = document.getElementById('custom-entry-submit');
  $customEntrySection = document.getElementById('custom-entry');

  constructor() {
    this.customEntryListener();
    this.submitButtonListener();
  }

  customEntryListener() {
    this.$addEntryButton.addEventListener('click', () => {
      const $customEntryDiv = document.createElement('div');
      $customEntryDiv.id = `ce${this.numberOfCustomEntries}`;

      const $codeLabel = document.createElement('label');
      $codeLabel.setAttribute('for', `code-input${this.numberOfCustomEntries}`);
      $codeLabel.innerText = `Code: `;

      const $codeInput = document.createElement('input');
      $codeInput.className = 'code-input';
      $codeInput.id = `code-input${this.numberOfCustomEntries}`;
      $codeInput.placeholder = '[CR][KR][SW]';
      $codeInput.maxLength = 2;

      const $shareLabel = document.createElement('label');
      $shareLabel.setAttribute('for', `share-input${this.numberOfCustomEntries}`);
      $shareLabel.innerText = ` Share ID: `;

      const $shareInput = document.createElement('input');
      $shareInput.className = 'share-input';
      $shareInput.id = `share-input${this.numberOfCustomEntries}`;
      $shareInput.placeholder = 'Share Id';

      const $amountLabel = document.createElement('label');
      $amountLabel.setAttribute('for', `amount-input${this.numberOfCustomEntries}`);
      $amountLabel.innerText = ` Amount: `;

      const $amountInput = document.createElement('input');
      $amountInput.className = 'amount-input';
      $amountInput.id = `amount-input${this.numberOfCustomEntries}`;
      $amountInput.placeholder = '$ Amount';

      $customEntryDiv.appendChild($codeLabel);
      $customEntryDiv.appendChild($codeInput);
      $customEntryDiv.appendChild($shareLabel);
      $customEntryDiv.appendChild($shareInput);
      $customEntryDiv.appendChild($amountLabel);
      $customEntryDiv.appendChild($amountInput);
      this.$customEntrySection.appendChild($customEntryDiv);
      this.numberOfCustomEntries++;
    });
  }

  submitButtonListener() {
    this.$submitButton.addEventListener('click', async () => {
      const transactions = [];
      const $messageResponse = document.getElementById('message-response');
      for (let i = 0; i < this.numberOfCustomEntries; i++) {
        const codeInput = document.getElementById(`code-input${i}`).value;
        const shareInput = document.getElementById(`share-input${i}`).value;
        const amountInput = document.getElementById(`amount-input${i}`).value;
        const selectedMember = sessionStorage.getItem('selectedMemberId');

        if (codeInput && shareInput && selectedMember && !isNaN(amountInput) && amountInput && amountInput > 0) {

          transactions[i] = {
            'memberId': selectedMember, 'shareId': shareInput, 'code': codeInput, 'amount': amountInput,
          };

          const customQuery = JSON.stringify({transactions});
          console.log(customQuery);
          const response = await STATIC.performFetch('/api/private/transaction', customQuery);
          response.json().then((data) => {
            const $messageResponse = document.getElementById('message-response');
            if (data['status'] === 'transactions success') {
              $messageResponse.innerText = data['status'];
              this.clearCustomEntries();
            } else {
              console.log(data);
              $messageResponse.innerText = data['errors'][0]['msg'];
            }
            console.log(data);
          });
        } else if (!selectedMember) {
          $messageResponse.innerText = `Please select a member`;
        } else if (!codeInput) {
          $messageResponse.innerText = `Please enter a transaction code`;
        } else if (!shareInput) {
          $messageResponse.innerText = `Please enter a share ID`;
        } else if (isNaN(amountInput) || !amountInput || amountInput < 0) {
          $messageResponse.innerText = `Please enter a valid amount`;
        }
      }
    });
  }

  clearCustomEntries() {
    for (let i = 0; i < this.numberOfCustomEntries; i++) {
      document.getElementById(`code-input${i}`).value = '';
      document.getElementById(`share-input${i}`).value = '';
      document.getElementById(`amount-input${i}`).value = '';
    }
  }
}

{
  new CustomEntry();
}


