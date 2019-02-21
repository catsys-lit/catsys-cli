'use strict';

import {
  UPDATE_PAGE
} from '../actions/app.js';

const INITIAL_STATE = {
  page: 'home'
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
};

export default app;
