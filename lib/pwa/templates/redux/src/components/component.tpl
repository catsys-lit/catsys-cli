import { html, LitElement, css } from 'lit-element';

class {{CLASS_NAME}} extends LitElement {
  static get properties() {
    return {
      hello: { type: String }
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.hello = 'Hello';
  }

  render() {
    return html`
        <p>Some static DOM</p>
        <h2>${this.hello} {{TAG_NAME}}</h2>
      `;
    }
}

window.customElements.define("{{TAG_NAME}}", {{CLASS_NAME}});
