<template>
  <div>
    <div class="py-2 bg-white sticky top-0 h-12 px-4 flex justify-between items-center shadow-sm">
      <nuxt-link :to="localePath('/')" tag="div" class="text-blue-600 cursor-pointer font-bold">Cloud Recipe</nuxt-link>
      <div>
        <div v-if="!$auth.loggedIn" @click="$store.commit('authentication/SHOW_MODAL')" class="shadow-lg cursor-pointer rounded-full py-1 px-5 bg-blue-600 text-white">
          {{ $t('btn.login') }}
        </div>
        <div v-else class="cursor-pointer flex items-center space-x-3">
          <nuxt-link :to="localePath('/recipes/create-recipe')">{{ $t('header.add') }}</nuxt-link>
          <nuxt-link :to="localePath('/recipes')">{{ $t('header.my_recipe') }}</nuxt-link>
          <div @click="showDetails = !showDetails" class="flex px-4 relative justify-center items-center space-x-2">
            <div class="bg-gray-400 uppercase w-7 text-white h-7 rounded-full flex justify-center items-center p-2">
              {{ $auth.user.username[0] + $auth.user.username[1] }}
            </div>
            <span>{{ $auth.user.username }}</span>
            <template>
              <div v-if="showDetails" class="absolute px-2 right-0 space-y-2 -bottom-10 rounded-sm shadow-lg py-1 bg-gray-400 text-white w-full">
                <div @click="logout" class="cursor-pointer flex items-center">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span class="">{{ $t('logout') }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <auth-modal v-if="displayModal" />
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import AuthModal from "./AuthModal";

export default {
  name: "HeaderMenu",
  components: {AuthModal},
  data () {
    return {
      showDetails: false
    }
  },
  computed: {
    ...mapState('authentication', ['displayModal'])
  },
  methods: {
    ...mapActions({
      logout: 'authentication/logout'
    })
  }
};
</script>

<style scoped>
.dropdown {
  @apply flex justify-center items-center
}
</style>
