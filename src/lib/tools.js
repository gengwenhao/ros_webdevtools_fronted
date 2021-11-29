// 纯粹的工具

// 移除Object中空值的key
export function trimObj(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
        delete obj[key]
      }
    }
  }
}

export function saveShareContent(content, fileName) {
  let downLink = document.createElement('a')
  downLink.download = fileName
  //字符内容转换为blod地址
  let blob = new Blob([content])
  downLink.href = URL.createObjectURL(blob)
  // 链接插入到页面
  document.body.appendChild(downLink)
  downLink.click()
  // 移除下载链接
  document.body.removeChild(downLink)
}

export function isEmptyStr(content) {
  return undefined === content || null === content || '' === content
}