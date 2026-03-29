/**
 * Copyright 2026 mcenci24
 * @license Apache-2.0
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class InstagramCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "instagram-card";
  }

  static get properties() {
    return {
      ...super.properties,
      description: { type: String },
      dateTaken: { type: String, attribute: "date-taken" },
      image: { type: String },
      authorName: { type: String, attribute: "author-name" },
      authorAvatar: { type: String, attribute: "author-avatar" },
      authorSince: { type: String, attribute: "author-since" },
      channelName: { type: String, attribute: "channel-name" },
      liked: { type: Boolean, reflect: true },
      disliked: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.dateTaken = "";
    this.image = "";
    this.authorName = "";
    this.authorAvatar = "";
    this.authorSince = "";
    this.channelName = "";
    this.liked = false;
    this.disliked = false;

    this.t = {
      ...this.t,
      like: "Like",
      dislike: "Dislike",
      share: "Share",
      userSince: "User since",
      taken: "Taken",
      imageAlt: "Gallery image",
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-default-text, #111827);
          font-family: var(--ddd-font-navigation, Arial, sans-serif);
        }

        .card {
          background: var(--ddd-theme-default-white, #ffffff);
          border: 1px solid var(--ddd-theme-default-limestoneLight, #d1d5db);
          border-radius: var(--ddd-radius-lg, 20px);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          max-width: 480px;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          background: #e5e7eb;
        }

        .author-block {
          min-width: 0;
        }

        .author-name {
          font-weight: 700;
          font-size: 1rem;
          line-height: 1.2;
        }

        .channel,
        .meta {
          font-size: 0.88rem;
          color: #4b5563;
          line-height: 1.3;
        }

        .media-wrap {
          background: #f3f4f6;
        }

        .media {
          width: 100%;
          display: block;
          aspect-ratio: 4 / 5;
          object-fit: cover;
        }

        .body {
          padding: 14px;
          display: grid;
          gap: 10px;
        }

        .title {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: black;
        }

        .description {
          margin: 0;
          font-size: 0.97rem;
          line-height: 1.55;
        }

        .actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        button {
          border: 1px solid var(--ddd-theme-default-limestoneLight, #d1d5db);
          background: transparent;
          color: inherit;
          border-radius: 999px;
          padding: 9px 14px;
          font: inherit;
          cursor: pointer;
          transition: transform 0.15s ease, border-color 0.15s ease;
        }

        button:hover,
        button:focus-visible {
          transform: translateY(-1px);
          outline: none;
          border-color: var(--ddd-theme-primary, #2563eb);
        }

        .liked {
          background: rgba(34, 197, 94, 0.12);
          border-color: rgba(34, 197, 94, 0.5);
        }

        .disliked {
          background: rgba(239, 68, 68, 0.12);
          border-color: rgba(239, 68, 68, 0.5);
        }

        @media (prefers-color-scheme: dark) {
          :host {
            color: #f9fafb;
          }

          .card {
            background: #111827;
            border-color: #374151;
          }

          .channel,
          .meta {
            color: #cbd5e1;
          }

          .media-wrap {
            background: #0f172a;
          }

          button {
            border-color: #475569;
          }
        }
      `,
    ];
  }

  _fire(name) {
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <article class="card">
        <div class="header">
          <img
            class="avatar"
            src="${this.authorAvatar}"
            alt="${this.authorName ? `${this.authorName} avatar` : `Author avatar`}"
            loading="lazy"
            decoding="async"
          />
          <div class="author-block">
            <div class="author-name">${this.authorName}</div>
            <div class="channel">${this.channelName}</div>
            <div class="meta">
              ${this.t.userSince}: ${this.authorSince} · ${this.t.taken}:
              ${this.dateTaken}
            </div>
          </div>
        </div>

        <div class="media-wrap">
          <img
            class="media"
            src="${this.image}"
            alt="${this.title || this.t.imageAlt}"
            decoding="async"
            fetchpriority="high"
          />
        </div>

        <div class="body">
          <p class="description">${this.description}</p>

          <div class="actions">
            <button
              class="${this.liked ? "liked" : ""}"
              @click="${() => this._fire("like-toggle")}"
              aria-pressed="${this.liked ? "true" : "false"}"
            >
              ${this.t.like}
            </button>

            <button
              class="${this.disliked ? "disliked" : ""}"
              @click="${() => this._fire("dislike-toggle")}"
              aria-pressed="${this.disliked ? "true" : "false"}"
            >
              ${this.t.dislike}
            </button>

            <button @click="${() => this._fire("share-photo")}">
              ${this.t.share}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(InstagramCard.tag, InstagramCard);