import { html, LitElement } from 'lit-element';
import style from './{{TAG_NAME}}-styles.js';

class {{CLASS_NAME}} extends LitElement {
  static get properties() {
    return {
      hello: { type: String }
    };
  }

  static get styles() {
    return style;
  }

  constructor() {
    super();
    this.hello = 'Hello World!';
  }

  render() {
    return html`
        <p>Some static DOM</p>
        <h2>${this.hello}</h2>
      `;
    }
}

window.customElements.define("{{TAG_NAME}}", {{CLASS_NAME}});
