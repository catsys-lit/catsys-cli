'use strict';

export const ACTION_NAME = 'ACTION_NAME';

const load = (data) => (dispatch) => {
  switch (data) {
    case 'data':
      // DO STUFF
      break;
    default:
      // DO ELSE STUFF
  }

  dispatch(someAction(data));
};

const someAction = (data) => {
  return {
    type: ACTION_NAME,
    data
  };
};
