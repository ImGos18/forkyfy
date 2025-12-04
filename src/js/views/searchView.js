import view from './view.js';
class searchView extends view {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this.#clearInput();

    return query;
  }

  #clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSarch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
