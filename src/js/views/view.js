import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';

export default class view {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = ` <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}!</p>
            </div> `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = ` <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}!</p>
            </div> `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElemets = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    // console.log(curElements);
    // console.log(newElemets);
    newElemets.forEach((newElemets, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newElemets.isEqualNode(curEl));

      //update changed text
      if (
        !newElemets.isEqualNode(curEl) &&
        newElemets.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(newElemets.firstChild);
        curEl.textContent = newElemets.textContent;
      }

      //update changed attributes

      if (!newElemets.isEqualNode(curEl)) {
        Array.from(newElemets.attributes).forEach(attribute => {
          curEl.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }
}
