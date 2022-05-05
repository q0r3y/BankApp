/**
 * Controls the actions of the menubar buttons
 */

'use strict';

import STATIC from '../../static.js';

export default class Search {
  $selectedResult;
  $lastSelectedResult;
  $lastSelectedShare;
  $currentSelectedShare;

  constructor() {
    // Erases session data between pages
    sessionStorage.clear();
    this.searchButtonListener();
  }

  searchButtonListener() {
    const $transferButton = document.getElementById('member-search-button');
    $transferButton.addEventListener('click', async () => {
      const $searchInput = document.getElementById('search-input').value;
      if ($searchInput.length > 0) {
        const searchString = JSON.stringify({'memberSearchValue': $searchInput});
        const getUsers = await STATIC.performFetch('/api/private/search', searchString);
        getUsers.json()
          .then((data) => {
            this.displayUserData(data);
          }).catch(() => {
          console.log(`No users found.`);
        });
      }
    });
  }

  displayUserData(data) {
    console.log(data);
    const $searchOutput = document.getElementById('search-result-bar');
    $searchOutput.innerHTML =
      '    <ul id="header">\n' +
      '        <p>FirstName</p>\n' +
      '        <p>Lastname</p>\n' +
      '        <p>Birthday</p>\n' +
      '        <p>SSN</p>\n' +
      '        <p>MemberID</p>\n' +
      '    </ul>';
    if (data.msg.users) {
      for (const user of data.msg.users) {
        console.log(user.firstName);
        this.displaySearchResult($searchOutput, user.firstName, user.lastName,
          user.zip, user.ssn, user.memberId);
      }
    } else if (data.msg.user) {
      this.displaySearchResult($searchOutput, data.msg.user.firstName, data.msg.user.lastName,
        data.msg.user.birthDate, data.msg.user.ssn, data.msg.user.memberId);
    }
  }

  displaySearchResult(searchResultElement, firstName, lastName, birthDate, ssn, memberId) {
    const $result = document.createElement('ul');
    const $firstName = document.createElement('p');
    const $lastName = document.createElement('p');
    const $birthDate = document.createElement('p');
    const $ssn = document.createElement('p');
    const $memberId = document.createElement('p');
    $firstName.innerText = firstName;
    $lastName.innerText = lastName;
    $birthDate.innerText = birthDate;
    $ssn.innerText = ssn;
    $memberId.innerText = memberId;
    $result.appendChild($firstName);
    $result.appendChild($lastName);
    $result.appendChild($birthDate);
    $result.appendChild($ssn);
    $result.appendChild($memberId);
    searchResultElement.appendChild($result);
    $result.addEventListener('click', () => {
      this.searchResultClicked($result, memberId);
    });
  }

  searchResultClicked($resultElement, memberId) {
    this.$selectedResult = $resultElement;
    if (this.$lastSelectedResult) {
      this.$lastSelectedResult.style = '';
    }
    this.$selectedResult.style = 'background-color: steelblue;';
    this.getMemberShares(memberId);
    this.$lastSelectedResult = this.$selectedResult;
    sessionStorage.setItem('selectedMemberId', memberId);
  }

  async getMemberShares(memberId) {
    const shareQuery = JSON.stringify({'memberId': memberId});
    const memberShares = await STATIC.performFetch('/api/private/getshares', shareQuery);
    const $memberShareElem = document.getElementById('member-shares');
    $memberShareElem.innerHTML = '';
    if (memberShares) {
      memberShares.json().then((data) => {
        if (data.msg.shares) {
          console.log(data.msg.shares);
          for (const share of data.msg.shares) {
            this.displayMemberShares($memberShareElem, share.memberId,
              share.shareCode, share.balance);
          }
        }
      });
    }
  }

  async displayMemberShares($memberShareElem, memberId, shareCode, balance) {
    const $account = document.createElement('div');
    const $accountName = document.createElement('p');
    const $balance = document.createElement('div');
    $accountName.className = 'account-name';
    $accountName.innerText = `${memberId}-${shareCode} ${this.getShareType(shareCode)}`;
    $balance.className = 'balance-amount';
    $balance.innerText = `${balance}`;
    $memberShareElem.appendChild($account);
    $account.appendChild($accountName);
    $account.appendChild($balance);
    console.log(memberId);
    $account.addEventListener('click', () => {
      this.shareResultClicked($account, shareCode);
    });
  }

  getShareType(shareCode) {
    if (shareCode > 0 && shareCode < 10) {
      return `Savings`;
    } else if (shareCode >= 10 && shareCode <= 29) {
      return `Checking`;
    }
  }

  shareResultClicked($shareElement, shareCode) {
    this.$currentSelectedShare = $shareElement;
    if (this.$lastSelectedShare) {
      this.$lastSelectedShare.lastChild.style = '';
    }
    $shareElement.lastChild.style = 'background: steelblue;';
    this.$lastSelectedShare = this.$currentSelectedShare;
    sessionStorage.setItem('selectedShareId', shareCode);
  }
}
{
  new Search();
}

