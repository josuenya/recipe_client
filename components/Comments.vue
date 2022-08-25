<template>
<div>
  <div class="bg-gray-500 text-white p-3 rounded-lg">
    <h1 class="font-bold">{{ comment.user.username }}</h1>
    <p>{{ comment.messages }}</p>
  </div>
  <div class="space-x-5 mt-1 flex">
    <span>{{ $moment(comment.createdAt).fromNow() }}</span>
    <span class="cursor-pointer">j'aime</span>
    <span @click="displayComment = true" class="cursor-pointer">Repondre</span>
    <p class="flex items-center space-x-1">
      <span>5</span>
      <svg class="h-6 w-6 p-1 text-white rounded-full bg-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    </p>
  </div>
  <div v-if="displayComment" class="my-2 flex space-x-2">
    <input type="text" placeholder="laisser un commentaire" class="border-2 border-blue-500 w-1/2 outline-none p-2 rounded-lg" />
    <button @click="displayComment=false">Commenter</button>
  </div>
  <div class="ml-5 py-1">
    <template v-for="(child, idx) in comment.childComments">
      <child-comments :key="idx" :children="child" />
    </template>
  </div>
</div>
</template>

<script>
import ChildComments from "./ChildComments";
export default {
  name: "comments",
  components: {ChildComments},
  props: ['comment'],
  data () {
    return {
      displayComment: false
    }
  }
}
</script>

<style scoped>

</style>
