import {html} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';

class DefaultPage extends PageDM {
  render() {
    return html`
      <section>
        <h2>Upps! This page is not exist</h2>
      </section>
    `;
  }
}

window.customElements.define('default-page', DefaultPage);
