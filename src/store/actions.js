import api from '@/api'
import {
  DEFAULT_BLOCKS_NUMBER,
  DEFAULT_REMOTE_MACHINE_NUMBER,
  DEFAULT_TEMPLATE_NUMBER
} from '@/config/dev-panel'

export default {
  updateGlobalInfo({commit}, {solutionID}) {
    return new Promise((resolve) => {
      const apiList = [
        api.commonAPI.getPanelInfo({solutionID}),
        api.definedBlock.list({page_size: DEFAULT_BLOCKS_NUMBER, solutionID}),
        api.codeTemplate.list({page_size: DEFAULT_TEMPLATE_NUMBER, solutionID}),
        api.remoteMachine.list({page_size: DEFAULT_REMOTE_MACHINE_NUMBER, solutionID})
      ]

      Promise.all(apiList).then(res => {
        const data = {
          ...res[0].data || {},
          blockList: res[1].data.results || [],
          templateList: res[2].data.results || [],
          remoteMachineList: res[3].data.results || []
        }
        commit('SET_GLOBAL_INFO', data)
        resolve(data)
      })

    })
  }
}
