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
// import {menuIcon} from './utils/{{APP_TAG}}-icons.js';

class {{APP_CLASS}} extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: {type: String},
      _page: {type: String}
    };
  }

  static get styles() {
      return css`
        :host {
          display: grid;
          min-height: 100vh;
          grid-template-areas:
            "header header header"
            "main   main   main"
            "footer footer footer";
          grid-template-rows: auto 1fr auto;
        }
        .header-app {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          grid-area: header;
          min-height: 60px;
          line-height: 30px;
          background-color: #7986CB;
          color: #e5e5e5;
        }
        .main-app {
          grid-area: main;
        }
        .footer-app {
          grid-area: footer;
          height: 60px;
          display: flex;
          justify-content: flex-start;
        }
        .container-app {
          padding: 15px;
          box-sizing: border-box;
        }
        .container-footer {
          padding: 0 15px;
          box-sizing: border-box;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title {
          color: white;
          font-weight: lighter;
          font-size: 1.5rem;
          flex: 1 auto;
        }
        .navbar-principal {
          display: flex;
          flex-flow: row nowrap;
          line-height: 60px;
        }
        .navbar-principal a{
          padding: 0 15px;
          position: relative;
        }
        .navbar-principal a.home {
          background-color: #5C6BC0;
        }
        .navbar-principal a.default {
          background-color: #3F51B5;
        }
        .social-github {
          display: flex;
          flex: 0 auto;
          align-items: center;
        }
        .social-github img{
          height: 60%;
        }
        @media (max-width: 600px) {
          .header-app {
            flex-flow: column nowrap
          }
          .navbar-principal {
            flex: 1 auto;
            justify-content: center;
          }
          .navbar-principal a{
            flex: 1 auto;
          }
        }
      `;
    }

  render() {
    // Anything that's related to rendering should be done in here.
    return html`
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
}

window.customElements.define('{{APP_TAG}}-app', {{APP_CLASS}});
