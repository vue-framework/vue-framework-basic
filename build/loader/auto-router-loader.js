const loaderUtils = require('loader-utils')
const path = require('path')
const fs = require('fs')
let str = ''
let root = true
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  source = source.replace("require('auto-router')", str || getRoute(options))
  return source
}

function getRoute (options) {
  let rootPath = path.join(process.cwd(), options.path)
  let lazy = options.lazy
  let arr = options.path.split('/')
  return setStr(rootPath, './' + arr[arr.length - 1])

  // 递归遍历设置str
  function setStr (rootPath, rpath) {
    let itemStr = ''
    let data = fs.readdirSync(rootPath)
    data.forEach(function (item) {
      let myPath = rootPath + '\\' + item
      let myrpath = rpath + '/' + item
      if (isFolder(myPath)) {
        itemStr += `{path: '${(root ? '/' : '') + item}', component: ${getComponent(myrpath)}${getChild(myPath, myrpath)}},`
      }
    })
    if (itemStr) {
      itemStr = itemStr.slice(0, -1)
      itemStr = '[' + itemStr + ']'
    }
    return itemStr
  }
  // 获取child
  function getChild (myPath, myrpath) {
    let childStr = setStr(myPath, myrpath)
    if (childStr) {
      return ',children: ' + childStr
    }
    return ''
  }
  // 获取组件str
  function getComponent (myPath) {
    let myFile = myPath + '/index.vue'
    if (lazy) { return `resolve => require(['${myFile}'], resolve)` }
    return `require('${myFile}')`
  }
  // 判断文件
  function isFolder (path) {
    return fs.statSync(path).isDirectory()
  }
}
// str = getRoute({
//   path: './examples/pages',
//   lazy: true
// })
