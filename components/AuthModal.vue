<template>
  <div>
    <transition name="modal">
      <div class="transition-opacity w-full fixed inset-0 z-50 overflow-y-auto flex items-center justify-center" style="background: rgba(21, 19, 19, .2)">
        <div class="bg-white relative px-5 lg:w-1/2 w-full rounded-md py-5">
          <div class="pb-2 space-y-1">
            <h1>{{ $t('modal.title') }} <span class="text-blue-500 font-bold">Cloud Recipe</span></h1>
            <p> <span class="text-blue-500 font-bold">Cloud recipe</span> {{ $t('modal.description') }}</p>
          </div>
          <ValidationObserver ref="form" v-slot="{passes}">
            <form @submit.prevent="passes(registerField ? registerUser : loginUser)" class="space-y-2">
              <ValidationProvider v-if="registerField" tag="div" v-slot="{errors}" name="email" rules="required|email" class="space-y-1">
                <label class="text-sm" for="email">{{ $t('modal.field.email') }}</label>
                <input v-model="form.email" id="email" type="text" :placeholder="$t('modal.field.email')" class="w-full outline-none border p-2 rounded-lg" />
                <div v-for="(error,i) in errors" :key="i" class="text-red-600 text-xs">
                  {{ error }}
                </div>
              </ValidationProvider>

              <ValidationProvider tag="div" v-slot="{errors}" name="username" rules="required" class="space-y-1">
                <label class="text-sm" for="username">{{ $t('modal.field.username') }}</label>
                <input v-model="form.username" id="username" type="text" :placeholder="$t('modal.field.username')" class="w-full outline-none border p-2 rounded-lg" />
                <div v-for="(error,i) in errors" :key="i" class="text-red-600 text-xs">
                  {{ error }}
                </div>
              </ValidationProvider>

            <ValidationProvider tag="div" v-slot="{errors}" name="password" rules="required" class="space-y-1">
              <label class="text-sm" for="pwd">{{ $t('modal.field.pwd') }}</label>
              <input v-model="form.password" id="pwd" type="password" :placeholder="$t('modal.field.pwd')" class="w-full outline-none border p-2 rounded-lg" />
              <div v-for="(error,i) in errors" :key="i" class="text-red-600 text-xs">
                {{ error }}
              </div>
            </ValidationProvider>

            <div class="flex justify-center mt-10">
              <button type="submit" :disabled="loading" :class="{'cursor-not-allowed':loading}" class="bg-blue-600 flex items-center space-x-2 rounded-full py-1 px-5 text-white">
                <span>{{ registerField ? `${$t('btn.signup')}` : `${$t('btn.login')}` }}</span>
                <svg v-if="loading" class="animate-spin -ml-1 mx-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
          </form>
          </ValidationObserver>
          <p @click="$store.commit('authentication/TOGGLE_FIELD')" class="cursor-pointer italic text-sm text-blue-600 font-bold float-right">{{ registerField ? `${$t('modal.have_account')}` : `${$t('modal.no_account')}` }}</p>
          <svg @click="$store.commit('authentication/HIDE_MODAL')" class="h-6 rounded-full bg-red-600 text-white cursor-pointer top-3 right-3 w-6 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {ValidationObserver, ValidationProvider} from 'vee-validate'

export default {
  name: "AuthModal",
  components: {ValidationObserver , ValidationProvider},
  data () {
    return {
      loading: false,
      form: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState('authentication', ['registerField'])
  },
  methods: {
    ...mapActions('authentication', ['login', 'register']),
    async loginUser() {
      await this.login({'username': this.form.username, 'password': this.form.password})
    },
    async registerUser () {
      await this.register(this.form)
    }
  }
}
</script>
