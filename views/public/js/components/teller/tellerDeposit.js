'use strict';

import STATIC from '../../static.js';

class Deposit {
  constructor() {
    Deposit.depositButtonListener();
  }

  static depositButtonListener() {
    const $depositButton = document.getElementById('deposit-button');
    $depositButton.addEventListener('click', async () => {
      const $deposit = document.getElementById('input-amount');
      const $messageResponse = document.getElementById('message-response');
      const selectedMember = sessionStorage.getItem('selectedMemberId');
      const selectedShare = sessionStorage.getItem('selectedShareId');

      if ($deposit.value && !isNaN($deposit.value) && $deposit.value > 0 &&
        selectedMember &&
        selectedShare) {
        const depositQuery = JSON.stringify(
          {
            'transactions': [
              {
                'memberId': selectedMember,
                'shareId': selectedShare,
                'code': 'CR',
                'amount': $deposit.value,
              },
            ],
          },
        );
        const response = await STATIC.performFetch('/api/private/transaction', depositQuery);
        response.json().then((data) => {

          if (data['status'] === 'transactions success') {
            $messageResponse.innerText = data['status'];
            sessionStorage.setItem('transCode', 'CR');
            sessionStorage.setItem('lastTransactionValue', $deposit.value);
            document.getElementById('print-button').disabled = false;
            $deposit.value = '';
          } else {
            console.log(data);
            // $messageResponse.innerText = data['errors'][0]['msg'];
          }
        });
      } else if (!selectedMember) {
        $messageResponse.innerText = `Please select a member`;
      } else if (!selectedShare) {
        $messageResponse.innerText = `Please select a share`;
      } else if (isNaN($deposit.value) || !$deposit.value || $deposit.value < 0) {
        $messageResponse.innerText = `Please enter a valid number`;
      }
    });
  }
}

{
  new Deposit();
}
