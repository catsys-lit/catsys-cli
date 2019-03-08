import {LitElement, html, css} from 'lit-element';
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
import {styles} from './{{APP_TAG}}-styles.js';
import { fadeInTransitionPage } from './utils/{{APP_TAG}}-transitions.js';
// import {menuIcon} from './utils/{{APP_TAG}}-icons.js';

class {{APP_CLASS}} extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: {type: String},
      _config: {type: Object},
      _page: {type: String}
    };
  }

  static get styles() {
      return [
          styles,
          fadeInTransitionPage
        ];
    }

  render() {
    return html`
      <style>
        .main-app.out {
              animation: ${this._config.transition.type}TransitionPage ${this._config.transition.delay / 1000}s;
          }
      </style>
      <!-- Header -->
      <header class="header-app">
        <div class="title container-app">
          Catsys (beta)
        </div>
        <nav class="navbar-principal">
          <a class="home" ?selected="${this._page === 'home'}" href="/home">Home</a>
          <a class="default" ?selected="${this._page === 'default'}" href="/default">More</a>
        </nav>
      </header>
      <!-- Main content -->
      <main role="main" class="container-app main-app">
        ${
            this._page === 'home' ?
              html`<home-page class="page" active></home-page>` :
              ''
        }
        ${
          this._page === 'default' ?
            html`<default-page class="page" active></default-page>` :
            ''
        }
      </main>
      <footer class="footer-app">
        <div class="container-footer">
          <p>Made with &#9829; by the Catsys team.</p>
        </div>
        <a class="social-github" href="https://github.com/alfonsorios96/catsys-cli">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="github-logo">
          <b>View on github</b>
        </a>
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
      const pageOut = this.shadowRoot.querySelector('.main-app');
      pageOut.classList.add('out');
      setTimeout(() => {
        pageOut.classList.remove('out');
      }, this._config.transition.delay);
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      });
    }
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._config = state.app.config;
  }
}

window.customElements.define('{{APP_TAG}}-app', {{APP_CLASS}});
