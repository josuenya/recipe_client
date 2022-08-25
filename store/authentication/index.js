import actions from './actions';
import mutations from './mutations'

export const state = () => ({
  displayModal: false,
  registerField: false,
})

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
