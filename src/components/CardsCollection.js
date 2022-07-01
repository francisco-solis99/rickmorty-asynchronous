import './CardRyM.js';
const API = 'https://rickandmortyapi.com/api';

class CardsCollection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles() {
    return /* css */`
    :host {

    }
  `;
  }

  connectedCallback() {
    this.idToStart = +this.getAttribute('idStart');
    this.idToEnd = +this.getAttribute('idEnd');
    this.method = this.getAttribute('method');
    this.render();
    this.prepareCards();
  }

  renderCard(data) {
    const pick = (obj, keys) => Object.fromEntries(keys.map(key => [key, obj[key] ?? null]));
    const needeData = pick(data, ['name', 'status', 'species', 'gender', 'image', 'location', 'origin']);
    const card = document.createElement('card-rym');
    card.setAttribute('characterData', JSON.stringify(needeData));
    const collection = this.shadowRoot.querySelector('.collection');
    collection.appendChild(card);
  }

  prepareCards() {
    const methods = {
      callbacks: this.getDataByCallbacks,
      promises: this.getDataByPromises,
      asyncAwait: this.getDataByAsyncAwait
    };

    for (let i = this.idToStart; i <= this.idToEnd; i += 1) {
      const method = methods[this.method];
      method.call(this, i);
    }
  }

  fetchData(urlApi, callback) {
    const xhttp = new XMLHttpRequest(); // Referencia del objeto que necesitamos.
    /* Hacemos un llamado a una url */
    xhttp.open('GET', urlApi, true); // El último parámetro hace referencia al asincronismo. Por defecto es true, pero lo ponemos para referencia.
    /* 'Escuchamos' lo que hará la conexión (Referente a los 5 estados que comenta el profesor) */
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) { // Validar si la petición se completó. (Estado 5 pero contamos desde 0 como en un array)
        if (xhttp.status === 200) { // Validar el estado en el que se encuentra la petición. (200 = todo bien, 400 = no encontró algo, 500 = error en el servidor)
          /* Regresar el callback (primer valor que pasamos es el error y el segundo es el resultado del llamado a la API) */
          callback(null, JSON.parse(xhttp.responseText)); // Como el resultado viene en formato de texto de JSON, lo tenemos que convertir a un objeto para trabajar con él
        } else {
          /* Definimos y retornamos un error en caso de obtenerlo (buena práctica) */
          const error = new Error('Error ' + urlApi);
          return callback(error, null);
        }
      }
    };
    xhttp.send(); // Enviamos la petición.
  }

  getDataByCallbacks(idCharacter) {
    this.fetchData(API, (err, data) => {
      if (err) throw new Error(err);

      this.fetchData(`${data.characters}/${idCharacter}`, (err2, character) => {
        if (err2) throw new Error(err);
        this.renderCard(character);
      });
    });
  }

  getDataByPromises(idCharacter) {
    console.log('By Promises');
  }

  getDataByAsyncAwait(idCharacter) {
    console.log('By Async/Await');
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CardsCollection.styles}</style>
    <div class="collection">
    </div>`;
  }
}

customElements.define('cards-collection', CardsCollection);
