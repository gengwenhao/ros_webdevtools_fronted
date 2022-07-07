import * as devPanel from './dev-panel'
import * as solutionList from './solution-list'
import * as blockly from './blockly'

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://124.222.231.14' : 'http://localhost:8000'
export const WS_URL = process.env.NODE_ENV === 'production' ? 'ws://124.222.231.14' : 'ws://localhost:8000'

export default {
  blockly,
  devPanel,
  solutionList
}
