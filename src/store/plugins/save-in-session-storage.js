const saveInSessionStorage = store => {
  if (sessionStorage.state) {
    // 从 sessionStorage 中读取 state
    store.replaceState(JSON.parse(sessionStorage.state))
  }

  store.subscribe(((mutation, state) => {
    // 保存 state 在 sessionStorage c中
    sessionStorage.state = JSON.stringify(state)
  }))
}

export default saveInSessionStorage
