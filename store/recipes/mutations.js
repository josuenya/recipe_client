export default {
  SET_RECIPES (state, data) {
    return state.recipes = data
  },
  SET_VIEW (state, value) {
    return state.view = value
  },
  INCREMENT_VIEW (state) {
    return ++state.view
  },
  SET_DETAIL (state, value) {
    return state.recipeDetail = value
  },
  SET_MY_RECIPES(state, data) {
    return state.myRecipes = data
  }
}
