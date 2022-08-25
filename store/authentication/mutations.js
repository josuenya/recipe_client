export default {
  HIDE_MODAL (state) {
    return state.displayModal = false
  },
  SHOW_MODAL (state) {
    return state.displayModal = true
  },
  TOGGLE_FIELD (state) {
    return state.registerField = !state.registerField
  }
}
