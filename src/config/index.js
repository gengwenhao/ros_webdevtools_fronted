import * as devPanel from './dev-panel'
import * as solutionList from './solution-list'
import * as blockly from './blockly'

export const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://124.222.231.14'
// export const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://124.222.231.14' : 'http://124.222.231.14/'

export default {
  blockly,
  devPanel,
  solutionList
}
