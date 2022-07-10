import Vue from 'vue'
import keymaster from 'keymaster'

const bindKeyHandler = fn => {
  return () => {
    fn()
    return false
  }
}

export const shortcut = {
  bind: (seed, func) => keymaster(seed, bindKeyHandler(func)),
  ...keymaster
}

Object.defineProperty(Vue.prototype, '$shortcut', {value: shortcut})
