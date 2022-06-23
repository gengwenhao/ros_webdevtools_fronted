import * as commonAPI from './common-api'
import * as remoteMachine from './modules/remote-machine'
import * as codeTemplate from './modules/code-template'
import * as solution from './modules/solution'
import * as definedBlock from './modules/defined-block'

export default {
  ...commonAPI,
  ...remoteMachine,
  ...codeTemplate,
  ...solution,
  ...definedBlock,
  codeTemplate,
  commonAPI,
  definedBlock,
  remoteMachine,
  solution,
}
