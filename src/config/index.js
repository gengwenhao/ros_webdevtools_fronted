import * as devPanel from './dev-panel'
import * as solutionList from './solution-list'
import * as blockly from './blockly'

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://localhost:8000/' : 'http://localhost:8000/'

export default {
  blockly,
  devPanel,
  solutionList
}
