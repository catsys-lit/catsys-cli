'use strict';

export const UPDATE_PAGE = 'UPDATE_PAGE';

export const navigate = (path) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'home' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));
};

const loadPage = (page) => (dispatch) => {
  switch (page) {
    case 'home':
      import('../../pages/home-page.js').then((module) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after home-view1.js is loaded.
      });
      break;
    default:
      page = 'default';
      import('../../pages/default-page.js');
  }

  dispatch(updatePage(page));
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};
