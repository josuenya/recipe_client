<template>
<div class="h-screen">
  <Header />
  <Nuxt class="lg:px-5 px-2 bg-images w-full py-5" style="min-height: calc(100vh - 88px)" />
  <Footer />
</div>
</template>

<script>
export default {
  name: "DefaultLayout"
};
</script>

<style scoped lang="css">
.bg-images {
  background-image: url("~/assets/images/background.svg");
}
</style>
