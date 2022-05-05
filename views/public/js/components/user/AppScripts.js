/**
 * When the user a logged in, this is ran on every page
 */

'use strict';

import STATIC from '../../static.js';
import MENU_BAR from './menubar.js';

class AppScripts {
  /**
   *
   */
  constructor() {
    STATIC.disableEnterKey();
    new MENU_BAR();
  }
}

{
  new AppScripts();
}
