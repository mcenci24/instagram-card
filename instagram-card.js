/**
 * Copyright 2026 mcenci24
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `instagram-card`
 *
 * @demo index.html
 * @element instagram-card
 */
export class InstagramCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "instagram-card";
  }

  constructor() {
    super();
    this.username = "";
    this.image = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Username",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/instagram-card.ar.json", import.meta.url).href +
        "/../",
    });
  }

  static get properties() {
    return {
      ...super.properties,
      username: { type: String },
      image: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          font-family: var(--ddd-font-navigation);
        }

        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-3);
          width: 320px;
          max-width: 100%;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          background: white;
        }

        h3 {
          margin: 0 0 var(--ddd-spacing-2) 0;
          font-size: var(--ddd-font-size-s);
        }

        h3 span {
          font-size: var(
            --instagram-card-label-font-size,
            var(--ddd-font-size-s)
          );
          font-weight: bold;
        }

        img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 10px;
          display: block;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}:</span> ${this.username}</h3>

        ${this.image
          ? html`<img src="${this.image}" alt="Fox" />`
          : html`<p>Loading...</p>`}

        <slot></slot>
      </div>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(InstagramCard.tag, InstagramCard);