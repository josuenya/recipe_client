export default {
  async recipes ({commit}) {
    await this.$axios.$get('recipes')
      .then((rep) => {
        commit('SET_VIEW', rep.view)
        commit('SET_RECIPES', rep.data)
        console.log('rep', rep.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  },
  async addView ({commit}, recipe_id) {
    await this.$axios.$put(`update-view`, {'id': recipe_id})
      .then((rep) => {
        commit('INCREMENT_VIEW')
        console.log('recipe ===>>', rep)
      })
      .catch((err) => {
        console.log('err', err)
      })
  },
  async getRecipeById ({commit}, recipe_id) {
    await this.$axios.$get(`/get-detail/${recipe_id}`)
      .then((rep) => {
        commit('SET_DETAIL', rep.data)
        console.log('recipe response', rep)
      })
      .catch((err) => {
        console.log('err==>>', err)
      })
  },
  async addRecipe ({commit}, payload) {
    console.log('payload ==>>', payload)
    await this.$axios.$post('recipe/create', payload)
      .then (() => {
        this.$toast.success('recette ajouter avec success')
      })
      .catch(() => {
        this.$toast.error('une erreur s\'est produite')
      })
  },
  async myRecipe ({commit}) {
    await this.$axios.$get('my-recipes')
      .then((rep) => {
        commit('SET_MY_RECIPES', rep.data)
        console.log('my recipes response ===>>', rep)
      })
      .catch((err) => {
        console.log('recipe error', err)
      })
  },
  async commentRecipe ({commit}, payload) {
    // console.log('comment payload', payload)
    await this.$axios.$post('comment-recipe', payload)
      .then ((rep) => {
        console.log('rep', rep)
        this.$toast.success('successfull')
      })
      .catch((err) => {
        console.log('error ==>', err)
      })
  }
}
