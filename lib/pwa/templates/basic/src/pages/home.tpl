import {html, css} from 'lit-element';
import {PageDM} from '../utils/page-dm.js';

class HomePage extends PageDM {
  static get styles() {
      return css`
        .principal-container > *{
          max-width: 600px;
          margin-left:auto;
          margin-right: auto;
        }
      `;
    }
    render() {
      return html`
      <section class="principal-container">
        <h2>Welcome to Catsys</h2>
        <p>Catsys is a CLI that helps you work with lit elements in a simpler way and is currently under construction</p>
        <p>We take as a base the <a href="https://github.com/polymer/pwa-starter-kit">Polymer PWA Starter Kit</a> to generate the scaffold</p>
      </section>
    `;
    }
}

window.customElements.define('home-page', HomePage);
