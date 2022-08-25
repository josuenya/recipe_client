<template>
<div>
  <h1 class="text-blue-600 italic mb-5 font-bold text-xl uppercase">{{recipeDetail.name}}</h1>

      <div class="border-b-2 mb-5 text-center">
        <h1 class="py-3 font-medium">Liste des Ingredients</h1>
      </div>

      <div class="lg:flex justify-between">
        <div class="space-y-3">
          <template v-for="(ingredient, idx) in recipeDetail.ingredients">
            <div :key="idx" class="flex space-x-3 items-center">
              <p class="w-2 h-2 bg-blue-500 rounded-full"></p>
              <p class="flex space-x-2">
                <span>{{ingredient.name}} - </span>
                <span>{{ingredient.quantity}}</span>
              </p>
            </div>
          </template>
        </div>
        <div class="lg:w-1/4 space-y-5 lg:h-1/4">
          <div>
            <img class="border border-2 rounded-lg" src="@/assets/images/recetteImage.webp" alt="recette par defaut">
            <p class="flex items-center space-x-3">
              <span>More recipes by <nuxt-link class="outline-none text-blue-500" to="/recipes/user/50">{{ recipeDetail.user_id.username }}</nuxt-link> </span>
              <svg class="h-8 w-8 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </p>
          </div>

          <div class="text-center space-y-3">
            <h2 class="border-b-2 py-3">Duree de la recette</h2>
            <p>{{ recipeDetail.duration }}</p>
          </div>
        </div>
      </div>

      <div>
        <div class="text-center border-b-2">
          <h1 class="font-medium py-3">Directives</h1>
        </div>
      </div>
      <div class="flex justify-center text-xl">
        <div class="w-full py-5">
          <p class="mb-3" v-for="(directive, idx) in recipeDetail.directives">
            <span class="text-blue-500 font-bold">{{idx + 1}}</span>
            {{directive.name}}
          </p>
        </div>
      </div>
  <div>
    <div class="border-b-2 mb-5 text-center">
      <h1 class="py-3 font-medium">Commentaires</h1>
    </div>
    <div class="mb-2">
      <div class="mb-2">
          <validation-observer ref="form" v-slot="{passes}">
            <form @submit.prevent="passes(comment)">
              <validation-provider tag="div" class="mb-3" rules="required" v-slot="{ errors }">
                <textarea v-model="message" placeholder="Laisser un commentaire..." class="p-2 rounded-lg bg-white w-full border outline-none border-2" name="directives" id="directives" rows="2"></textarea>
                <p class="text-red-600 text-xs italic">{{ errors[0] }}</p>
              </validation-provider>
              <button type="submit" class="bg-blue-500 py-1 px-5 rounded-lg text-white">Commenter</button>
            </form>
          </validation-observer>
        </div>
      <template v-for="(comment, idx) in recipeDetail.comments">
        <comments :comment="comment" />
      </template>
    </div>
  </div>
</div>
</template>

<script>
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import {mapActions, mapState} from "vuex";

export default {
  name: "_id",
  components: {ValidationProvider,ValidationObserver},
  async asyncData ({params, store}) {
    await store.dispatch('recipes/getRecipeById', params.id)
    await store.dispatch('comments/index', params.id)
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState('recipes',['recipeDetail'])
  },
  mounted() {
    console.log('this.$route.params', this.$route.params.id)
  },
  methods: {
    ...mapActions('recipes', ['commentRecipe']),
    async comment () {
      await this.commentRecipe({messages: this.message, recipe_id: this.recipeDetail._id})
      .then ((rep) => {
        this.$nuxt.refresh()
        this.message = ''
      })
      .catch((err) => {
        console.log('err ===>>', err)
      })
    }
  }
}
</script>

<style scoped>

</style>
