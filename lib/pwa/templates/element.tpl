import {LitElement, html} from 'lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {installRouter} from 'pwa-helpers/router.js';
import {updateMetadata} from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import {store} from './bridge/store.js';

// These are the actions needed by this element.
import {
  navigate
} from './bridge/actions/app.js';

// These are the elements needed by this element.
// import {menuIcon} from './utils/{{APP_TAG}}-icons.js';

class {{APP_CLASS}} extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: {type: String},
      _page: {type: String}
    };
  }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <!-- Header -->
      <app-header condenses reveals effects="waterfall">
        <!-- This gets hidden on a small screen-->
        <nav class="toolbar-list">
          <a ?selected="${this._page === 'home'}" href="/home">Home page</a>
          <a ?selected="${this._page === 'default'}" href="/default">404 page</a>
        </nav>
      </app-header>

      <!-- Main content -->
      <main role="main">
        <h2>${this.appTitle + ' - ' + this._page}</h2>
        ${
            this._page === 'home' ?
              html`<home-page class="page" ?active="${this._page === 'home'}"></home-page>` :
              ''
        }
        ${
          this._page === 'default' ?
            html`<default-page class="page" ?active="${this._page === 'default'}"></default-page>` :
            ''
        }
      </main>

      <footer>
        <p>Made with &spadesuit; by the Catsys team.</p>
      </footer>
    `;
  }

  constructor() {
    super();
    // TODO Initialize properties
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      });
    }
  }

  stateChanged(state) {
    this._page = state.app.page;
  }

  otherPage() {
    this._page = 'default';
  }
}

window.customElements.define('{{APP_TAG}}-app', {{APP_CLASS}});
