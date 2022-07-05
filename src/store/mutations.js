export default {
  SET_GLOBAL_INFO(state, paylod) {
    state.globalInfo = paylod || {
      templateCnt: 0,
      projectCnt: 0,
      blocklyFunctionCnt: 0,
      remoteMachineCnt: 0
    }
  }
}
