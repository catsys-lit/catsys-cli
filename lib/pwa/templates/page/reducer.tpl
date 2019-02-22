'use strict';

import {
  ACTION_NAME
} from '../actions/{{PAGE_NAME}}.js';

const INITIAL_STATE = {
  data: 'data'
};

const {{PAGE_NAME}} = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default {{PAGE_NAME}};
