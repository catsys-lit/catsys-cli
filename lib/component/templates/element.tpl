import { html, render } from 'lit-html';
import styles from './{{TAG_NAME}}-styles.js';

class {{CLASS_NAME}} extends HTMLElement {
  static get properties() {
    return {
      hello: { type: String }
    };
  }

  constructor() {
    super();
    this.hello = 'Hello World!';
    this.root = this.attachShadow({ mode: 'open'});
    this.__render();
  }

  template() {
    return html`
        <style>
         ${styles}
        </style>
        <p>Some static DOM</p>
        <h2>${this.hello}</h2>
      `;
    }

    // You must to call __render() in order of any changes.
  __render(){
      render(this.template(), this.root, {eventContext: this});
    }
}

window.customElements.define("{{TAG_NAME}}", {{CLASS_NAME}});

