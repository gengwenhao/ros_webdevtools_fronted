import * as devPanel from './dev-panel'
import * as solutionList from './solution-list'
import * as blockly from './blockly'

// export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://124.222.231.14'
// export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://192.168.0.3:8000'
export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'
export const WS_HOST = process.env.NODE_ENV === 'production' ? 'ws://localhost' : 'ws://localhost:8000'

export default {
  blockly,
  devPanel,
  solutionList
}
