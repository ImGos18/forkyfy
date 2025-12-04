import view from './view.js';
import previewView from './previewView.js';

class resultsView extends view {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'no recipes found for your query. Please try again';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
