const loaderUtils = require('loader-utils')
const path = require('path')
const fs = require('fs')
let str = null
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  source = source.replace("require('auto-router')", str || getRoute(options))
  return source
}

function getRoute (options) {
  let rootPath = path.join(process.cwd(), options.path)
  let lazy = options.lazy
  let arr = options.path.split('/')
  let json = setStr(rootPath, './' + arr[arr.length - 1])
  let data = merge({
    routes: json
  }, read(rootPath))
  write(rootPath, data)
  console.log('写入router.JSON文件')
  str = parseTreeJson(data)
  return str

  // 递归遍历设置str
  function setStr (PabsPath, Prelpath, ischild) {
    let itemStr = []
    let data = fs.readdirSync(PabsPath)
    data.forEach(function (item) {
      let absPath = PabsPath + '\\' + item
      let relpath = Prelpath + '/' + item
      if (isFolder(absPath)) {
        let child = setStr(absPath, relpath, true)
        let obj = {
          path: options.empty === item ? '*' : ((ischild ? '' : '/') + item),
          component: getComponent(relpath)
        }
        if (child.length) {
          obj.children = child
        }
        itemStr.push(obj)
      }
    })
    return itemStr
  }

  // 获取组件str
  function getComponent (myPath) {
    let myFile = myPath + '/index.vue'
    if (lazy) { return `resolve => require(['${myFile}'], resolve) ` }
    return `require('${myFile}')`
  }
  // 判断文件
  function isFolder (path) {
    return fs.statSync(path).isDirectory()
  }
  function write (path, json) {
    fs.writeFileSync(path + '/router.json', JSON.stringify(json, undefined, 2))
  }
  function read (path) {
    try {
      let str = fs.readFileSync(path + '/router.json')
      return str && JSON.parse(str)
    } catch (err) { console.log('初始化文件') }
  }
}

function parseTreeJson (json, isc) {
  if (isc) return json
  if (Array.isArray(json)) return parseArr(json)
  if (typeof json === 'object') return parseObj(json)
  return `'${json}'`
  function parseArr (arr) {
    let str = ''
    arr.forEach(function (item) {
      str += parseTreeJson(item) + ','
    })
    return `[${str.slice(0, -1)}]`
  }

  function parseObj (obj) {
    let str = ''
    for (let key in obj) {
      str += (key + ':' + parseTreeJson(obj[key], key === 'component') + ',')
    }
    return `{${str.slice(0, -1)}}`
  }
}

function merge (json1, json2) {
  if (!json2) return json1
  let obj = Object.assign({}, json1, json2)
  if (json1.routes && json2.routes) {
    obj.routes = mergeArr(json1.routes, json2.routes)
  }
  return obj
  function mergeArr (arr1, arr2) {
    let arr = []
    for (let item1 of arr1) {
      let nohas = true
      for (let item2 of arr2) {
        if (item1.path === item2.path) {
          nohas = false
          if (item1.children && item2.children) {
            item2.children = mergeArr(item1.children, item2.children)
          }
          arr.push(Object.assign(item1, item2))
        }
      }
      if (nohas) {
        arr.push(item1)
      }
    }
    return arr
  }
}

// getRoute({
//   path: './examples/pages',
//   lazy: true
// })
