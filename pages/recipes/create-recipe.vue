<template>
<div class="flex justify-center items-center">
  <ValidationObserver class="flex-1" ref="form" v-slot="{passes}">
    <form @submit.prevent="passes(addRecipes)">
      <div class="space-y-2 lg:mx-16 mx-2">
        <div class="text-center flex justify-center z-20 mx-auto">
          <img class="w-1/4 h-1/4 border border-2 rounded-lg" src="@/assets/images/recetteImage.webp" alt="recette par defaut">
        </div>
        <div>
          <label for="image">{{ $t('new_recipes.image') }}</label>
          <input type="file" id="image" class="input" :placeholder="$t('new_recipes.image')">
        </div>

        <ValidationProvider tag="div" rules="required" v-slot="{ errors }">
          <label for="name">{{ $t('new_recipes.name') }}</label>
          <input v-model="form.name" type="text" id="name" class="input" :placeholder="$t('new_recipes.name')">
          <span class="text-red-600 text-xs italic">{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" rules="required" v-slot="{ errors }">
          <label for="time">{{ $t('new_recipes.duration') }}</label>
          <input v-model="form.duration" type="text" id="time" class="input" :placeholder="$t('new_recipes.duration')">
          <span class="text-red-600 text-xs italic">{{ errors[0] }}</span>
        </ValidationProvider>

        <div class="">
          <label for="ingredients">{{ $t('new_recipes.ingredients') }}</label>
          <div class="space-y-3">
            <div v-for="(ingredient, idx) in ingredients" :key="idx" class="flex items-center space-x-2">
              <input v-model="ingredient.name" type="text" id="ingredients" class="input" :placeholder="`${$t('new_recipes.ingredients')} #${idx+1}`">
              <input v-model="ingredient.quantity" type="text" id="quantity" class="input" :placeholder="$t('new_recipes.qty')">
              <div @click="removeIngredient(idx)" class="border-2 border-gray-900 rounded-md cursor-pointer p-1">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div @click="addIngredient" class="bg-blue-600 cursor-pointer text-center text-white py-1 rounded-md font-bold">
          <span class="flex items-center justify-center">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {{ $t('btn.add_ingredient') }}
          </span>
            </div>
          </div>
        </div>

        <div>
          <label for="directives">{{ $t('new_recipes.guidelines') }}</label>
          <div class="space-y-3">
            <div v-for="(directive, idx) in directives" :key="idx" class="flex items-center space-x-2">
              <textarea v-model="directive.name" :placeholder="`${$t('new_recipes.guidelines')} #${idx+1}`" class="p-2 bg-white w-full border outline-none border-2" name="directives" id="directives" rows="3"></textarea>
              <div @click="removeDirective(idx)" class="border-2 border-gray-900 rounded-md cursor-pointer p-1">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <div @click="addDirective" class="cursor-pointer bg-blue-600 text-center text-white py-1 rounded-md font-bold">
          <span class="flex items-center justify-center">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {{ $t('btn.add_guidelines') }}
          </span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <div class="publish bg-blue-400 text-white" v-for="(pub, idx) in publish" :key="idx">
        <span @click="defaultMessage = pub.description">
          {{ $t(`${pub.name}`) }}
        </span>
          </div>
          <p>{{ $t(`${defaultMessage}`) }}</p>
        </div>

        <button type="submit" class="bg-blue-500 text-white font-bold px-3 py-1 rounded-md">{{ $t('btn.create') }}</button>
      </div>
    </form>
  </ValidationObserver>
</div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {mapActions} from "vuex";
export default {
  name: "create-recipe",
  components: { ValidationObserver, ValidationProvider },
  data () {
    return {
      ingredients: [
        {
          name: '',
          quantity: ''
        }
      ],
      directives: [{
        name: ''
      }],
      defaultMessage: 'new_recipes.public.description',
      publish: [
        {
          name: 'new_recipes.public.title',
          description: 'new_recipes.public.description'
        },
        {
          name: 'new_recipes.private.title',
          description: 'new_recipes.private.description'
        }
      ],
      form: {
        name: '',
        duration: ''
      }
    }
  },
  methods: {
    ...mapActions('recipes', ['addRecipe']),
    addIngredient () {
      this.ingredients.push({
        name: '',
        quantity: ''
      })
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addDirective () {
      this.directives.push({
        name: ''
      })
    },
    removeDirective (idx) {
      this.directives.splice(idx, 1)
    },
    async addRecipes () {
     await this.addRecipe({
       'name': this.form.name,
       'duration': this.form.duration,
       'ingredients': this.ingredients,
       'directives': this.directives,
       'share': true
     })
      .then(() => {
        this.form.name = ''
        this.form.duration = ''
        this.directives = ''
        this.ingredients = ''
      })
      .catch((err) => {
        console.log('err', err);
      })
    },
  },
}
</script>

<style scoped>
.input {
  @apply w-full bg-white p-2 rounded-lg outline-none border
}
.publish {
  @apply border border-2 px-3 py-1 cursor-pointer
}
</style>
