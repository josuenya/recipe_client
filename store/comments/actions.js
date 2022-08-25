export default {
  async index ({commit}, recipe_id) {
    await this.$axios.$get('comments')
      .then((rep) => {
        console.log('rep of comments', rep);
      })
      .catch((err) => {
        console.log('err', err);
      })
  }
}
