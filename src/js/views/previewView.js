import view from './view.js';
import icon from 'url:../../img/icons.svg';

class previewView extends view {
  _parentEl = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
          <a class="preview__link ${
            this._data.id === id ? 'preview__link--active' : ''
          }" href="#${this._data.id}">
            <figure class="preview__fig">
              <img src="${this._data.image}" alt="Test" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__name">
               ${this._data.title}
               <p class="preview__publisher">${this._data.publisher}</p>
              </h4>
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
                  <svg>
                    <use href="${icon}#icon-user"></use>
                  </svg>
              </div>
            </div>
          </a>
        </li>`;
  }
}

export default new previewView();
