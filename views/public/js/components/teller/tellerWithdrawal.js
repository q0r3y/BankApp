'use strict';

import STATIC from '../../static.js';

class Withdrawal {
  constructor() {
    Withdrawal.withdrawalButtonListener();
  }

  static withdrawalButtonListener() {
    const $withdrawalButton = document.getElementById('withdrawal-button');
    $withdrawalButton.addEventListener('click', async () => {
      const $withdrawal = document.getElementById('input-amount');
      const $messageResponse = document.getElementById('message-response');
      const selectedMember = sessionStorage.getItem('selectedMemberId');
      const selectedShare = sessionStorage.getItem('selectedShareId');

      if ($withdrawal.value && !isNaN($withdrawal.value) && $withdrawal.value > 0 &&
        selectedMember &&
        selectedShare) {
        const withdrawalQuery = JSON.stringify(
          {
            'transactions': [
              {
                'memberId': selectedMember,
                'shareId': selectedShare,
                'code': 'SW',
                'amount': $withdrawal.value,
              },
            ],
          },
        );
        const response = await STATIC.performFetch('/api/private/transaction', withdrawalQuery);
        response.json().then((data) => {
          const $messageResponse = document.getElementById('message-response');
          if (data['status'] === 'transactions success') {
            $messageResponse.innerText = data['status'];
            sessionStorage.setItem('transCode', 'SW');
            sessionStorage.setItem('lastTransactionValue', $withdrawal.value);
            document.getElementById('print-button').disabled = false;
            $withdrawal.value = '';
          } else {
            console.log(data);
            //$messageResponse.innerText = data['errors'][0]['msg'];
          }
          console.log(data);
        });
      } else if (!selectedMember) {
        $messageResponse.innerText = `Please select a member`;
      } else if (!selectedShare) {
        $messageResponse.innerText = `Please select a share`;
      } else if (isNaN($withdrawal.value) || !$withdrawal.value || $withdrawal.value < 0) {
        $messageResponse.innerText = `Please enter a valid number`;
      }
    });
  }
}

{
  new Withdrawal();
}
