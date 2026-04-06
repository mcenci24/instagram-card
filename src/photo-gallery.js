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
      post: { type: Object },
      activeIndex: { type: Number },
      liked: { type: Boolean },
      loading: { type: Boolean },
      error: { type: String },
    };
  }

  constructor() {
    super();
    this.post = null;
    this.activeIndex = 0;
    this.liked = false;
    this.loading = true;
    this.error = "";
    this._onPopState = this._onPopState.bind(this);
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: min(100%, 760px);
      }

      .wrap {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
      }

      .status {
        text-align: center;
        font-size: 1rem;
        color: var(--ddd-theme-default-slateGray);
      }

      @media (prefers-color-scheme: dark) {
        .status {
          color: var(--ddd-theme-default-limestoneLight);
        }
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
    this._loadRoute();
    await this._fetchPost();
  }

  async _fetchPost() {
    try {
      const response = await fetch("/api/photos");
      if (!response.ok) {
        throw new Error("Failed to load photo data");
      }

      const data = await response.json();
      this.post = data.post;
      this._normalizeActiveIndex();
      this._loadReaction();
    } catch (error) {
      this.error = error.message || "Something went wrong";
    } finally {
      this.loading = false;
    }
  }

  _loadRoute() {
    const params = new URLSearchParams(window.location.search);
    const index = Number(params.get("activeIndex"));
    this.activeIndex = Number.isInteger(index) && index >= 0 ? index : 0;
  }

  _normalizeActiveIndex() {
    const total = this.post?.images?.length || 0;
    if (!total) {
      this.activeIndex = 0;
      return;
    }
    if (this.activeIndex >= total) {
      this.activeIndex = 0;
    }
  }

  _syncRoute() {
    const url = new URL(window.location.href);
    url.searchParams.set("activeIndex", this.activeIndex);
    window.history.replaceState({}, "", url);
  }

  _reactionKey() {
    return `photo-reaction-${this.activeIndex}`;
  }

  _loadReaction() {
    const saved = localStorage.getItem(this._reactionKey());
    this.liked = saved === "like";
  }

  _saveReaction(value) {
    if (value) {
      localStorage.setItem(this._reactionKey(), value);
    } else {
      localStorage.removeItem(this._reactionKey());
    }
    this._loadReaction();
  }

  _changeSlide(event) {
    this.activeIndex = event.detail.index;
    this._syncRoute();
    this._loadReaction();
  }

  _toggleLike() {
    const nextValue = this.liked ? null : "like";
    this._saveReaction(nextValue);
  }


  _onPopState() {
    this._loadRoute();
    this._normalizeActiveIndex();
    this._loadReaction();
  }

  render() {
    if (this.loading) {
      return html`<div class="wrap"><div class="status">Loading...</div></div>`;
    }

    if (this.error || !this.post) {
      return html`
        <div class="wrap">
          <div class="status">${this.error || "Unable to load post"}</div>
        </div>
      `;
    }

    return html`
      <div class="wrap">
        <instagram-card
          .displayName=${this.post.author.name}
          .username=${"@" + this.post.author.channelName}
          .profilePic=${this.post.author.image}
          .userSince=${this.post.author.userSince}
          .description=${this.post.description}
          .images=${this.post.images}
          .activeIndex=${this.activeIndex}
          .liked=${this.liked}
          @change-slide=${this._changeSlide}
          @toggle-like=${this._toggleLike}
        ></instagram-card>
      </div>
    `;
  }
}

customElements.define(PhotoGallery.tag, PhotoGallery);