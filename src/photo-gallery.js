import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./instagram-card.js";

export class PhotoGallery extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "photo-gallery";
  }

  static get properties() {
    return {
      ...super.properties,
      items: { type: Array },
      activeIndex: { type: Number },
      loading: { type: Boolean },
      reactions: { type: Object },
      copied: { type: Boolean },
      routeMode: { type: String },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.activeIndex = 0;
    this.loading = true;
    this.reactions = {};
    this.copied = false;
    this.routeMode = "home";

    this.t = {
      previous: "Previous",
      next: "Next",
      loading: "Loading...",
      copied: "Link copied",
      back: "Back to gallery",
    };

    this._onPopState = this._onPopState.bind(this);
  }

  static get styles() {
    return css`
      .wrap {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        display: grid;
        gap: 12px;
      }

      .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      button {
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid #ccc;
        background: white;
        cursor: pointer;
      }

      .status {
        text-align: center;
        font-size: 0.9rem;
        color: green;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("popstate", this._onPopState);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this._onPopState);
    super.disconnectedCallback();
  }

  async firstUpdated() {
    this._loadReactions();
    this._loadRoute();
    await this._fetchGallery();
  }

  updated(changed) {
    if (changed.has("activeIndex") || changed.has("routeMode")) {
      this._syncUrl();
    }
  }

  async _fetchGallery() {
    try {
      const res = await fetch("/api/photos");
      const data = await res.json();
      this.items = data.items || [];
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }

  _loadRoute() {
    const match = window.location.pathname.match(/\/post\/(\d+)/);
    if (match) {
      this.routeMode = "post";
      this.activeIndex = Number(match[1]) || 0;
    } else {
      this.routeMode = "home";
    }
  }

  _onPopState() {
    this._loadRoute();
  }

  _syncUrl() {
    const url = new URL(window.location.href);

    if (this.routeMode === "post") {
      url.pathname = `/post/${this.activeIndex}`;
      url.search = "";
    } else {
      url.pathname = "/";
    }

    window.history.replaceState({}, "", url);
  }

  _goHome() {
    this.routeMode = "home";
  }

  _next() {
    this.activeIndex = (this.activeIndex + 1) % this.items.length;
  }

  _previous() {
    this.activeIndex =
      (this.activeIndex - 1 + this.items.length) % this.items.length;
  }

  _loadReactions() {
    this.reactions = JSON.parse(localStorage.getItem("reactions") || "{}");
  }

  _saveReactions() {
    localStorage.setItem("reactions", JSON.stringify(this.reactions));
  }

  _toggleLike() {
    const id = this.currentItem.id;
    this.reactions[id] = this.reactions[id] === "like" ? null : "like";
    this._saveReactions();
  }

  _toggleDislike() {
    const id = this.currentItem.id;
    this.reactions[id] =
      this.reactions[id] === "dislike" ? null : "dislike";
    this._saveReactions();
  }

  async _shareCurrent() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    this.copied = true;
    setTimeout(() => (this.copied = false), 1500);
  }

  get currentItem() {
    return this.items[this.activeIndex];
  }

  render() {
    if (this.loading) return html`<div class="wrap">${this.t.loading}</div>`;

    const item = this.currentItem;
    if (!item) return html`<div class="wrap">No data</div>`;

    return html`
      <div class="wrap">
        <div class="controls">
          <button @click=${this._previous}>${this.t.previous}</button>
          <div>${this.activeIndex + 1} / ${this.items.length}</div>
          <button @click=${this._next}>${this.t.next}</button>
        </div>

        ${this.routeMode === "post"
          ? html`<button @click=${this._goHome}>${this.t.back}</button>`
          : ""}

        <instagram-card
          .description=${item.description}
          .dateTaken=${item.dateTaken}
          .image=${item.images.full}
          .authorName=${item.author.name}
          .authorAvatar=${item.author.avatar}
          .authorSince=${item.author.userSince}
          .channelName=${item.author.channelName}
          @like-toggle=${this._toggleLike}
          @dislike-toggle=${this._toggleDislike}
          @share-photo=${this._shareCurrent}
        ></instagram-card>

        <div class="status">${this.copied ? this.t.copied : ""}</div>
      </div>
    `;
  }
}

customElements.define(PhotoGallery.tag, PhotoGallery);