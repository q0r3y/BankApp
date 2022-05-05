/**
 * Contains Static methods that are used on multiple pages
 */

'use strict';

export default class Static {
  static async performFetch(api, data) {
    return await fetch(api, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  static disableEnterKey() {
    document.addEventListener('keypress', function(event) {
      const theKey = event.key;
      if (theKey.length > 1) {
        if (theKey === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    });
  }
}

