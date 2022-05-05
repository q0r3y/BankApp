'use strict';

class TellerUpload {
  constructor() {
    this.submitButtonListener();
  }

  // https://stackoverflow.com/questions/5587973/javascript-upload-file
  submitButtonListener() {
    const $submitButton = document.getElementById('submit-button');
    $submitButton.addEventListener('click', async () => {
      const selectedMember = sessionStorage.getItem('selectedMemberId');
      const $messageResponse = document.getElementById('message-response');
      const file = document.getElementById('file').files[0] || '';
      if (selectedMember) {
        if (file.length !== 0) {
          const formData = new FormData();
          formData.append('memberId', sessionStorage.getItem('selectedMemberId'));
          formData.append(file.name, file);
          const response = await fetch('/api/private/upload',
            {method: 'POST', body: formData});
          response.json().then((data) => {
            console.log(data);
            if (data['status'] === 'success') {
              $messageResponse.innerText = data['status'];
              setTimeout(() => {
                window.location.href = '/teller/home';
              }, 2000);
            } else {
              $messageResponse.innerText = data['errors'][0]['msg'];
            }
          });
        } else {
          $messageResponse.innerText = `Please input a file`;
        }
      } else {
        $messageResponse.innerText = `Please select a member`;
      }
    });
  }
}

{
  new TellerUpload();
}
