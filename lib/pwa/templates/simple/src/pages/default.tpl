import {html, css} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';

class DefaultPage extends PageDM {
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
          <h2>Communication between pages</h2>
          <p>The applications generated by Catsys are communicated at 2 different levels in 2 different ways, the first is at the application level using redux for the communication of pages, the second is at the component level, where all the components within an application communicate with each other following the standard of webcomponents.</p>
          <p>As an example, the navigation of this application uses redux to change the page</p>
        </section>
      `;
    }
}

window.customElements.define('default-page', DefaultPage);
