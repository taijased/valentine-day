
export function showMainHeart({ commit }) {
  commit('UPDATE_MAIN_HEART')
}

export function setCounterValentine({ commit }, payload) {
  commit('UPDATE_COUNTER_VALENTINE', payload)
}
