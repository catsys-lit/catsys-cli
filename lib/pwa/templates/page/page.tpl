import {html} from 'lit-element';
import {PageDM} from '../utils/page-dm.js';

class {{PAGE_CLASS}} extends PageDM {
  render() {
    return html`
      <section>
        <h2>{{PAGE_TAG}}</h2>
      </section>
    `;
  }
}

window.customElements.define('{{PAGE_TAG}}', {{PAGE_CLASS}});
