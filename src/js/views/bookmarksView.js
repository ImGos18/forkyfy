import view from './view.js';
import previewView from './previewView.js';
import icon from 'url:../../img/icons.sprite.svg';

class bookmarksView extends view {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it`;

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarksView();
