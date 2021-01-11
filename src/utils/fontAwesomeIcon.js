import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faUser,
  faExchangeAlt,
  faTrashAlt,
  faLayerGroup,
  faCheckSquare,
  faMapMarkerAlt,
  faComments,
  faEdit,
  faHome,
  faSuitcase,
  faInfoCircle,
  faUserEdit,
  faRunning,
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faUser,
  faExchangeAlt,
  faTrashAlt,
  faLayerGroup,
  faCheckSquare,
  faMapMarkerAlt,
  faComments,
  faEdit,
  faHome,
  faSuitcase,
  faInfoCircle,
  faUserEdit,
  faRunning,
);

import {
  faClock,
  faClipboard,
  faCheckSquare as farCheckSquare,
  faUser as farUser,
} from '@fortawesome/free-regular-svg-icons';
library.add(faClock, faClipboard, farCheckSquare, farUser);

Vue.component('awesome', FontAwesomeIcon);
