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
      display: flex;
      flex-direction: column;
      width: 90%;
      height: 100%;
      margin: 0 auto;
      min-height: 200px;
    }

    /* card image */

    .card-image {
      width: 70%;
      margin: 0 auto;
      padding: 25px 20px;
      box-sizing: border-box;
      border-radius: 20px 20px 0 0;
      background-color: #3E3A3A;
      text-align: center;
      box-shadow: 4px 4px 10px rgba(0,0,0,0.75);

    }

    .image-wrapper {
      display: block;
      margin: 0 auto;
      width: 60%;
    }

    .image {
      height: 100%;
      width:100%;
      min-height: 100px;
      object-fit: cover;
    }

    /* card info*/
    .card-info {
      width: 80%;
      height: 100%;
      margin: 0 auto;
      margin-top: -20px;
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background-color: #fff;
      border: 2px solid #000;
      box-shadow: 4px 4px 10px rgba(0,0,0,0.75);
    }

    .character-name {
      margin: 0;
      font-size: 2rem;
      text-align: center
    }

    .card-info p {
      font-size: 1.6rem;
    }

    .character-tags {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      gap: 0 10px;
    }

    .character-tag  {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 10px;
      border-radius: 20px;
      background-color: #D9D9D9;
    }

    .character-tag > p {
      margin: 0;
      margin-left: 8px;
      font-size: 1.4rem;
    }

    .status-icon {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    .status-icon.green {
      background-color: #91CF7B;
    }

    .status-icon.red {
      background-color: #cf7b7b;
    }

    /*skeleton classes */

    .skeleton {
      opacity: .7;
      animation: skeleton-loading 1s linear infinite alternate;
    }

    .skeleton-text {
      width:  100%;
      height: .5rem;
      margin-bottom: .25rem;
      border-radius: .125rem;
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

  // util for xmlHttpRequest
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

  getDataByCallbacks() {
    this.fetchData(API, (err, data) => {
      if (err) throw new Error(err);

      this.fetchData(`${data.characters}/${this.idCharacter}`, (err2, character) => {
        if (err2) throw new Error(err);
        this.renderData(character);
      });
    });
  }

  // util for the promises process to convert the response into json
  loadJson(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(err => console.log(new Error(err)));
  }

  getDataByPromises() {
    this.loadJson(API)
      .then(data => this.loadJson(`${data.characters}/${this.idCharacter}`))
      .then(dataCharacter => this.renderData(dataCharacter))
      .catch(err => console.log(new Error(err)));
  }

  async getDataByAsyncAwait() {
    try {
      const data = await this.loadJson(API);
      const dataCharacter = await this.loadJson(`${data.characters}/${this.idCharacter}`);
      this.renderData(dataCharacter);
    } catch (err) {
      throw new Error(err);
    }
  }

  renderData(characterData) {
    const article = this.shadowRoot.querySelector('.card');
    const aliveIndicator = characterData.status.toLowerCase() === 'alive' ? 'green' : 'red';
    article.innerHTML = `
      <div class="card-image">
        <figure class="image-wrapper">
          <img src="${characterData.image}" alt="Character Image" class="image">
        </figure>
      </div>
      <div class="card-info">
        <h3 class="character-name">${characterData.name}</h3>

        <div class="character-info">
          <p><strong>Especies: </strong>${characterData.species}</p>
          <p><strong>Gender: </strong>${characterData.gender}</p>
          <p><strong>Origin: </strong>${characterData.origin.name}</p>
        </div>

        <div class="character-tags">
          <div class="character-tag">
            <span class="status-icon ${aliveIndicator}"></span>
            <p>${characterData.status}</p>
            </div>
          <div class="character-tag">
            <img class="planet-icon" src="./public/planet.svg"></img>
            <p>${characterData.location.name}</p>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${CardRyM.styles}</style>
    <article class="card">
      <div class="card-image">
        <figure class="image-wrapper">
          <div class="image skeleton"></div>
        </figure>
      </div>
      <div class="card-info">
        <h3 class="character-name skeleton skeleton-text"></h3>

        <div class="character-info">
          <p class="skeleton skeleton-text"><strong></strong></p>
          <p class="skeleton skeleton-text"><strong></strong></p>
          <p class="skeleton skeleton-text"><strong></strong></p>
        </div>

        <div class="character-tags">
          <p class="skeleton skeleton-text"></p>
          <p class="skeleton skeleton-text"></p>
        </div>
    </article>`;
  }
}

customElements.define('card-rym', CardRyM);
