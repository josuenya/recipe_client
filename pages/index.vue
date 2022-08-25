<template>
  <div>
    <h1 class="flex justify-center text-lg mb-2 underline">{{ $t('title') }}</h1>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-2 pb-3">
      <div v-for="(recipe, idx) in recipes" :key="idx" @click="add_view(recipe._id)" class="border relative bg-white hover:scale-100 cursor-pointer rounded-lg shadow-lg">
        <nuxt-link :to="`recipes/${recipe._id}`">
          <img class="h-48 w-full" src="@/assets/images/recetteImage.webp" alt="recette">
          <div class="w-full px-2 py-1 absolute bottom-0" style="background: rgba(21, 19, 19, .4)">
            <span class="text-blue-600 hover:underline font-medium">{{ recipe.name }}</span>
            <div class="flex space-x-2 text-white">
              <div class="flex items-center space-x-1">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>5</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{{ recipe.view > 0 ? recipe.view : 0 }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ recipe.duration }}
              </div>
              <div class="flex items-center space-x-1">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ $moment(recipe.createdAt).format('DD-MM-YYYY') }}</span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <AuthModal v-if="displayModal" />
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  async asyncData ({store}) {
    await store.dispatch('recipes/recipes')
  },
  name: 'IndexPage',
  data () {
    return {
      display: false,
    }
  },
  computed: {
    ...mapState('authentication', ['displayModal']),
    ...mapState('recipes', ['recipes'])
  },
  methods: {
    ...mapActions('recipes', ['addView']),
    async add_view (recipe_id) {
      await this.addView(recipe_id)
    }
  }
}
</script>
