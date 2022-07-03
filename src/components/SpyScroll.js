class SpyScroll extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles() {
    return /* css */`
    :host {

    }

    .navbar {
      width: 90%;
      margin: 0 auto;
    }

    .navbar-list {
      list-style-type: none;
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: 0;
    }
    .navbar-list::before {
      content: "";
      position: absolute;
      top: 12px;
        display: block;
      width: 100%;
      height: 2px;
      background-color: #db789d;
    }

    .navbar-item {
      color: #000;
      font-size: 1.6rem;
    }

    .navbar-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: #000;
    }

    .navbar-point {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      width: 24px;
      height: 24px;
      background-color: #d9d9d9;
      border-radius: 50%;
      transition: all 250ms ease-in-out;
    }

    .navbar-point.fill {
      background-color: #7c30c9;
      transition: all 250ms ease-in-out;

    }

    .current::after {
      content: "";
      display: block;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background-color: #7c30c9;
      transition: all 250ms ease-in-out;
    }

    .navbar-link-text {
      margin-top: 7px;
    }
  `;
  }

  connectedCallback() {
    this.render();
    this.addListeners();
  }

  addListeners() {
    const pointsLinks = this.shadowRoot.querySelectorAll('.navbar-link');
    const points = this.shadowRoot.querySelectorAll('.navbar-point');
    const sections = document.querySelectorAll('.cards-section');
    pointsLinks.forEach((pointLink, index, self) => pointLink.addEventListener('click', (e) => {
      // add current
      const porcentageToMove = pointLink.dataset.move;
      points.forEach(point => {
        if (point.parentNode.dataset.move === porcentageToMove) {
          point.classList.add('current');
          point.classList.remove('fill');
          sections[index].style.transform = 'transalteX(0%)';
        } else if (Number(point.parentNode.dataset.move) < Number(porcentageToMove)) {
          point.classList.add('fill');
          sections[index].style.transform = 'transalteX(100%)';
        } else {
          point.classList.remove('current');
          point.classList.remove('fill');
          sections[index].style.transform = 'transalteX(100%)';
        }
      });
    }));
  }

  // moveThrough(e, array) {
  //   console.log(this);
  //   console.log(e.target);
  //   console.log(array);
  // }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SpyScroll.styles}</style>
    <div>
      <nav class="navbar">
        <ul class="navbar-list">
          <li class="navbar-item">
            <a href="#callbacks" class="navbar-link" data-move="0">
              <div class="navbar-point current"></div>
              <span class="navbar-link-text">Callbacks</span>
            </a>
          </li>
          <li class="navbar-item">
            <a href="#promises" class="navbar-link" data-move="100">
              <div class="navbar-point"></div>
              <span class="navbar-link-text">Promises</span>
            </a>
          </li>
          <li class="navbar-item">
            <a href="#async-await" class="navbar-link" data-move="200">
              <div class="navbar-point"></div>
              <span class="navbar-link-text">Async/Await</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>`;
  }
}

customElements.define('spy-scroll', SpyScroll);
