import * as model from './model.js';
import { MODAL_CLOSE_SEC, TIMEOUT_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0 result view mark selected result
    resultsView.update(model.getSearchResultsPage());

    //load recipe
    await model.loadRecipe(`${id}`);

    //render Data
    recipeView.render(model.state.recipe);

    //update bookmarks view
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
}

async function searchResults() {
  try {
    //1 get search query
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    //2 load search results
    await model.loadSearchResults(query);

    //3 Render results
    // console.log(model.state.search);

    resultsView.render(model.getSearchResultsPage());

    //4 render initial pagination btns
    paginationView.render(model.state.search);
  } catch (error) {}
}

function controlPagination(goToPage) {
  //render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //render new pagination buttons
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  if (newServings <= 0) return;
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  //add or remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }
  //update recipeview
  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

function controllBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);

    // console.log(model.state.recipe);

    //render uploaded recipe
    recipeView.render(model.state.recipe);

    //success Message
    addRecipeView.renderMessage();

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, TIMEOUT_SEC * 1000);

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);
    bookmarksView.update(model.state.bookmarks);

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form
  } catch (err) {
    console.error(err, '📉');
    addRecipeView.renderError(err.message);
  }
}

function init() {
  bookmarksView.addHandlerRender(controllBookmarks);
  recipeView.addhandlerRender(showRecipe);
  recipeView.addhandlerUpdateServings(controlServings);
  recipeView.addhandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSarch(searchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
