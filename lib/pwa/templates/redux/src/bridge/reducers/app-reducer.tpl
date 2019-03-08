'use strict';

import {
  UPDATE_PAGE
} from '../actions/app.js';

const INITIAL_STATE = {
    page: 'home',
    config: {
      type: 'app',
      transition: {
        type: 'fadeIn',
        delay: 300
      }
    }
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
