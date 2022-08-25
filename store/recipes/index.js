import actions from './actions'
import mutations from './mutations'

export const state = () => ({
  view: null,
  recipeDetail: [],
  myRecipes: []
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
