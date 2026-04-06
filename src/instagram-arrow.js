import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

class InstagramArrow extends DDDSuper(LitElement) {
  static properties = {
    direction: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    button {
      background: var(--ddd-theme-default-white);
      color: var(--ddd-theme-default-coalyGray);
      border: 3px solid var(--ddd-theme-default-beaverBlue);
      border-radius: 50%;
      width: 48px;
      height: 48px;
      font-size: 22px;
      font-weight: 700;
      cursor: pointer;
      transition: 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      line-height: 1;
    }

    button:hover:not(:disabled) {
      background: var(--ddd-theme-default-limestoneLight);
      transform: scale(1.05);
    }

    button:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      border-color: var(--ddd-theme-default-limestoneGray);
      color: var(--ddd-theme-default-limestoneGray);
    }

    @media (prefers-color-scheme: dark) {
      button {
        background: var(--ddd-theme-default-coalyGray);
        color: var(--ddd-theme-default-white);
        border-color: var(--ddd-theme-default-limestoneGray);
      }

      button:hover:not(:disabled) {
        background: var(--ddd-theme-default-slateGray);
      }
    }

    @media (max-width: 700px) {
      button {
        width: 40px;
        height: 40px;
        font-size: 18px;
      }
    }
  `;

  _click() {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent("instagram-arrow-click", {
        bubbles: true,
        composed: true,
        detail: { direction: this.direction },
      }),
    );
  }

  render() {
    return html`
      <button
        ?disabled=${this.disabled}
        @click=${this._click}
        aria-label=${this.direction === "left"
          ? "Previous image"
          : "Next image"}
        title=${this.direction === "left" ? "Previous image" : "Next image"}
      >
        ${this.direction === "left" ? "←" : "→"}
      </button>
    `;
  }
}

customElements.define("instagram-arrow", InstagramArrow);