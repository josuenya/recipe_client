<template>
<div>
  <p v-for="(recipe, idx) in myRecipes">
    <span>{{recipe.name}}</span>
  </p>
</div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "index",
  async asyncData ({store}) {
   await store.dispatch('recipes/myRecipe')
  },
  computed: {
    ...mapState('recipes', ['myRecipes'])
  }
}
</script>
