const API = 'https://rickandmortyapi.com/api';

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
      width: 320px;
      height: 80px;
      margin: 0 auto;
      background: papayawhip;
    }

    .skeleton {
      opacity: .7;
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
    this.idCharacter = this.getAttribute('idCharacter');
    this.render();
  }

  getDataByCallbacks() {
    console.log('cargando la data de la card ' + this.idCharacter);
    const article = this.shadowRoot.querySelector('.card');
    console.log(article);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${CardRyM.styles}</style>
    <article class="card">
      <div class="card-image">
        <figure class="image-wrapper">
          <img src="" alt="Character Image" class="image skeleton">
        </figure>
      </div>
      <div class="card-info">
        <h3 class="character-name"></h3>

        <div class="character-info">
          <p><strong></strong></p>
          <p><strong></strong></p>
          <p><strong></strong></p>
        </div>

        <div class="character-tags">
          <p></p>
          <p></p>
        </div>
    </article>`;
  }
}

customElements.define('card-rym', CardRyM);
