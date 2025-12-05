import view from './view';
import icon from 'url:../../img/icons.sprite.svg';
import { RESULTS_PER_PAGE } from '../config';

class paginationView extends view {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1, there are other pages
    if (currPage === 1 && numPages > 1) {
      return `
          <button data-goto="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    //last page
    if (currPage === numPages && numPages > 1) {
      return `
          <button data-goto="${
            currPage - 1
          }" class="btn--inline  pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>`;
    }
    //other page
    if (currPage < numPages) {
      return `
          <button data-goto="${
            currPage - 1
          }" class="btn--inline  pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button data-goto="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }
    //page 1, there are not other pages
    return '';
  }
}

export default new paginationView();
