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
  faClipboardList,
  faHashtag,
  faGlobeAmericas,
  faFillDrip,
  faPlusCircle,
  faLayerGroup,
  faHeart,
  faSearch,
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
  faClipboardList,
  faHashtag,
  faGlobeAmericas,
  faFillDrip,
  faPlusCircle,
  faLayerGroup,
  faHeart,
  faSearch,
);

import {
  faClock as farClock,
  faClipboard as farClipboard,
  faCheckSquare as farCheckSquare,
  faUser as farUser,
  faCheckCircle as farCheckCircle,
  faMeh as farMeh,
  faHeart as farHeart,
} from '@fortawesome/free-regular-svg-icons';
library.add(
  farClock,
  farClipboard,
  farCheckSquare,
  farUser,
  farCheckCircle,
  farMeh,
  farHeart,
);

Vue.component('awesome', FontAwesomeIcon);
