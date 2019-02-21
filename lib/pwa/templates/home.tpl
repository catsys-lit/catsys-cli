import {html} from 'lit-element';
import {PageDM} from '../utils/page-dm.js';

class HomePage extends PageDM {
  render() {
    return html`
      <section>
        <h2>Static page</h2>
        <p>This is a text-only page</p>
      </section>
    `;
  }
}

window.customElements.define('home-page', HomePage);
