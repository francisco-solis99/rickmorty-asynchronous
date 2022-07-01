class CardRyM extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles() {
    return /* css */`
    :host {

    }

    .card {
      // opacity: .7;
      animation: skeleton-loading 1s linear infinite alternate;
    }

    @keyframes skeleton-loading  {
      0%{
        background-color: hsl(200, 20%, 70%);
      }

      100% {
        background-color: hsl(200, 20%, 95%);
      }
    }
  `;
  }

  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('characterData'));
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${CardRyM.styles}</style>
    <article class="card">
      <div class="card-image">
        <figure class="image-wrapper">
          <img src="${this.data.image}" alt="Character Image" class="image">
        </figure>
      </div>
      <div class="card-info">
        <h3 class="character-name">${this.data.name}</h3>

        <div class="character-info">
          <p><strong>Especies: ${this.data.especies} </strong></p>
          <p><strong>Gender: ${this.data.gender}</strong></p>
          <p><strong>Origin:${this.data.origin.name}</strong></p>
        </div>

        <div class="character-tags">
          <p>${this.data.status}</p>
          <p>${this.data.origin.name}</p>
        </div>
    </article>`;
  }
}

customElements.define('card-rym', CardRyM);
