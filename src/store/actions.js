import api from '@/api'

export default {
  updateGlobalInfo({commit}, payload) {
    return new Promise((resolve, reject) => {
      api.commonAPI
         .getPanelInfo(payload)
         .then(res => {
           commit('SET_GLOBAL_INFO', res.data)
           resolve(res)
         })
         .catch(err => [
           reject(err)
         ])
    })
  }
}
