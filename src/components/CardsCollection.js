import './CardRyM.js';

class CardsCollection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles() {
    return /* css */`
    :host {

    }
    .collection {
      display: grid;
      grid-template-columns: repeat( auto-fit, minmax(265px, 1fr));
      gap: 30px 10px;
    }

    @media screen and (min-width: 768px) {
      .collection {
        grid-template-columns: repeat( auto-fit, minmax(340px, 1fr));
        gap: 30px 0;
      }
    }
  `;
  }

  connectedCallback() {
    this.idToStart = +this.getAttribute('idStart');
    this.idToEnd = +this.getAttribute('idEnd');
    this.method = this.getAttribute('method');
    this.render();
    this.loadData();
  }

  prepareCards() {
    const cards = [];
    for (let i = this.idToStart; i < this.idToEnd; i += 1) {
      cards.push(`<card-rym idCharacter="${i}"></card-rym>`);
    }
    return cards.join('');
  }

  loadData() {
    const cards = this.shadowRoot.querySelectorAll('card-rym');
    cards.forEach(card => {
      if (this.method === 'callbacks') card.getDataByCallbacks();
      if (this.method === 'promises') card.getDataByPromises();
      if (this.method === 'asyncawait') card.getDataByAsyncAwait();
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CardsCollection.styles}</style>
    <div class="collection">
      ${this.prepareCards()}
    </div>`;
  }
}

customElements.define('cards-collection', CardsCollection);
