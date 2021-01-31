import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faUser,
  faExchangeAlt,
  faTrashAlt,
  faAlignLeft,
  faCheckSquare,
  faMapMarkerAlt,
  faComments,
  faEdit,
  faHome,
  faSuitcase,
  faInfoCircle,
  faUserEdit,
  faRunning,
  faTag,
  faPaperclip,
  faClock,
  faSkull,
  faBell,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faUser,
  faExchangeAlt,
  faTrashAlt,
  faAlignLeft,
  faCheckSquare,
  faMapMarkerAlt,
  faComments,
  faEdit,
  faHome,
  faSuitcase,
  faInfoCircle,
  faUserEdit,
  faRunning,
  faTag,
  faPaperclip,
  faClock,
  faSkull,
  faBell,
  faUserFriends,
);

import {
  faClock as farClock,
  faClipboard as farClipboard,
  faCheckSquare as farCheckSquare,
  faUser as farUser,
  faCheckCircle as farCheckCircle,
  faMeh as farMeh,
} from '@fortawesome/free-regular-svg-icons';
library.add(
  farClock,
  farClipboard,
  farCheckSquare,
  farUser,
  farCheckCircle,
  farMeh,
);

Vue.component('awesome', FontAwesomeIcon);
