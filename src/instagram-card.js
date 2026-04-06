import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./instagram-arrow.js";

export class InstagramCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "instagram-card";
  }

  static get properties() {
    return {
      ...super.properties,
      displayName: { type: String },
      username: { type: String },
      profilePic: { type: String },
      userSince: { type: String },
      description: { type: String },
      images: { type: Array },
      activeIndex: { type: Number },
      liked: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.displayName = "";
    this.username = "";
    this.profilePic = "";
    this.userSince = "";
    this.description = "";
    this.images = [];
    this.activeIndex = 0;
    this.liked = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      .outer-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        width: 100%;
      }

      .card {
        width: min(100%, 640px);
        border: 1px solid var(--ddd-theme-default-limestoneGray);
        border-radius: 16px;
        overflow: hidden;
        background: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-coalyGray);
        box-shadow: 0 8px 24px
          color-mix(in srgb, var(--ddd-theme-default-coalyGray) 8%, transparent);
      }

      .header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        border-bottom: 1px solid var(--ddd-theme-default-limestoneGray);
      }

      .profile-pic {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid var(--ddd-theme-default-limestoneGray);
        background: var(--ddd-theme-default-limestoneLight);
        flex-shrink: 0;
      }

      .user-meta {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }

      .display-name {
        font-size: 0.98rem;
        font-weight: 700;
      }

      .username,
      .since {
        font-size: 0.8rem;
        color: var(--ddd-theme-default-slateGray);
      }

      .image-region {
        display: grid;
        grid-template-columns: 56px minmax(0, 1fr) 56px;
        align-items: center;
        gap: 10px;
        padding: 12px;
      }

      .image-wrap {
        width: 100%;
        aspect-ratio: 1 / 1;
        background: var(--ddd-theme-default-limestoneLight);
        border-radius: 12px;
        overflow: hidden;
      }

      .post-image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .content {
        padding: 0 16px 16px;
      }

      .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        margin: 4px 0 14px;
      }

      .action-btn {
        border: 1px solid var(--ddd-theme-default-limestoneGray);
        background: var(--ddd-theme-default-white);
        color: var(--ddd-theme-default-coalyGray);
        border-radius: 999px;
        padding: 8px 14px;
        font-size: 0.9rem;
        cursor: pointer;
        transition: 0.2s ease;
      }

      .action-btn:hover {
        transform: translateY(-1px);
        background: var(--ddd-theme-default-limestoneLight);
      }

      .action-btn.active-like {
        border-color: var(--ddd-theme-primary);
        color: var(--ddd-theme-primary);
        font-weight: 700;
      }

      .description {
        margin: 0 0 8px 0;
        font-size: 0.96rem;
        line-height: 1.45;
      }

      .slide-meta {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
        font-size: 0.82rem;
        color: var(--ddd-theme-default-slateGray);
        margin-bottom: 12px;
      }

      .thumb-strip {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }

      .thumb-btn {
        border: 2px solid transparent;
        padding: 0;
        background: none;
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
      }

      .thumb-btn.active {
        border-color: var(--ddd-theme-primary);
      }

      .thumb {
        display: block;
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        background: var(--ddd-theme-default-limestoneLight);
      }

      @media (prefers-color-scheme: dark) {
        .card {
          background: var(--ddd-theme-default-coalyGray);
          color: var(--ddd-theme-default-white);
          border-color: var(--ddd-theme-default-slateGray);
        }

        .header {
          border-bottom-color: var(--ddd-theme-default-slateGray);
        }

        .username,
        .since,
        .slide-meta {
          color: var(--ddd-theme-default-limestoneLight);
        }

        .image-wrap {
          background: var(--ddd-theme-default-slateGray);
        }

        .action-btn {
          background: var(--ddd-theme-default-slateGray);
          color: var(--ddd-theme-default-white);
          border-color: var(--ddd-theme-default-slateGray);
        }

        .action-btn:hover {
          background: var(--ddd-theme-default-slateMaxLight);
        }

        
      }

      @media (max-width: 700px) {
        .outer-wrap {
          gap: 8px;
        }

        .image-region {
          grid-template-columns: 40px minmax(0, 1fr) 40px;
          gap: 8px;
          padding: 10px;
        }

        .content {
          padding: 0 12px 12px;
        }

        .toolbar {
          gap: 8px;
        }

        .action-btn {
          padding: 7px 12px;
          font-size: 0.84rem;
        }
      }
    `;
  }

  get currentImage() {
    return this.images?.[this.activeIndex] || null;
  }

  get visibleThumbs() {
    const total = this.images?.length || 0;
    if (!total) return [];

    let start = this.activeIndex - 1;
    let end = this.activeIndex + 1;

    if (start < 0) {
      start = 0;
      end = Math.min(2, total - 1);
    }

    if (end >= total) {
      end = total - 1;
      start = Math.max(0, total - 3);
    }

    const thumbs = [];
    for (let i = start; i <= end; i++) {
      thumbs.push({
        img: this.images[i],
        index: i,
      });
    }

    return thumbs;
  }

  _prev() {
    if (!this.images.length) return;
    this.dispatchEvent(
      new CustomEvent("change-slide", {
        bubbles: true,
        composed: true,
        detail: {
          index: (this.activeIndex - 1 + this.images.length) % this.images.length,
        },
      }),
    );
  }

  _next() {
    if (!this.images.length) return;
    this.dispatchEvent(
      new CustomEvent("change-slide", {
        bubbles: true,
        composed: true,
        detail: {
          index: (this.activeIndex + 1) % this.images.length,
        },
      }),
    );
  }

  _selectThumb(index) {
    this.dispatchEvent(
      new CustomEvent("change-slide", {
        bubbles: true,
        composed: true,
        detail: { index },
      }),
    );
  }

  _toggleLike() {
    this.dispatchEvent(
      new CustomEvent("toggle-like", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const image = this.currentImage;

    return html`
      <div class="outer-wrap">
        <div class="card">
          <div class="header">
            <img
              class="profile-pic"
              src="${this.profilePic}"
              alt="${this.displayName} profile picture"
              loading="lazy"
            />
            <div class="user-meta">
              <div class="display-name">${this.displayName}</div>
              <div class="username">${this.username}</div>
              <div class="since">User since ${this.userSince}</div>
            </div>
          </div>

          <div class="image-region">
            <instagram-arrow
              direction="left"
              @instagram-arrow-click=${this._prev}
            ></instagram-arrow>

            <div class="image-wrap">
              ${image
                ? html`
                    <img
                      class="post-image"
                      src="${image.full}"
                      alt="${image.name}"
                      loading="lazy"
                    />
                  `
                : ""}
            </div>

            <instagram-arrow
              direction="right"
              @instagram-arrow-click=${this._next}
            ></instagram-arrow>
          </div>

          <div class="content">
            <div class="toolbar">
              <button
                class="action-btn ${this.liked ? "active-like" : ""}"
                @click=${this._toggleLike}
              >
                Like
              </button>

              <button class="action-btn">
                Share
              </button>

              
            </div>

            <p class="description">${this.description}</p>

            <div class="slide-meta">
              <span>${image?.name || ""}</span>
              <span>${image?.dateTaken || ""}</span>
              <span>${this.activeIndex + 1} / ${this.images.length}</span>
            </div>

            <div class="thumb-strip">
              ${this.visibleThumbs.map(
                ({ img, index }) => html`
                  <button
                    class="thumb-btn ${index === this.activeIndex ? "active" : ""}"
                    @click=${() => this._selectThumb(index)}
                    aria-label="Go to image ${index + 1}"
                  >
                    <img
                      class="thumb"
                      src="${img.thumbnail}"
                      alt="${img.name}"
                      loading="lazy"
                    />
                  </button>
                `,
              )}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(InstagramCard.tag, InstagramCard);