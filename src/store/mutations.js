export default {
  SET_GLOBAL_INFO(state, paylod) {
    console.log(paylod)
    Object.assign(state.globalInfo, paylod)
  }
}
