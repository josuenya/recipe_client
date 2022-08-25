<template>
<div class="h-10 bg-gray-900 font-bold text-white text-sm flex justify-between items-center px-4">
  <p class="">Copyright &copy <a target="_blank" class="text-blue-500" href="https://www.linkedin.com/in/josue-nya-a055b316b/">Josue NYA</a> {{ $t('copyright') }}</p>
  <p class="px-3 cursor-pointer">
    <nuxt-link v-if="$i18n.locale === 'en'" :to="switchLocalePath('fr')"><img class="w-8" src="~/assets/images/flag/english.svg" alt=""></nuxt-link>
    <nuxt-link v-else :to="switchLocalePath('en')"><img class="w-8" src="~/assets/images/flag/french.svg" alt=""></nuxt-link>
  </p>
</div>
</template>

<script>
export default {
  name: "TheFooter"
};
</script>

