/*
每次新建项目目录结构
*/

var fs = require('fs')
var path = require('path')

// 递归创建目录 异步方法
function mkdirs(dirname, callback) {
  // fs.exists 通过检查文件系统来测试给定的路径是否存在。然后使用 true 或 false 为参数调用 callback(已弃用)
  fs.exists(dirname, function (exists) {
    if (exists) {
      callback()
    } else {
      // console.log(path.dirname(dirname));
      // 递归重复执行函数
      mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback)
        console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录')
      })
    }
  })
}

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  // fs.exists() 的同步版本。 如果路径存在，则返回 true，否则返回 false。注意，虽然 fs.exists() 是废弃的，但 fs.existsSync() 不是。
  if (fs.existsSync(dirname)) {
    console.log(true);
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

// 递归创建目录 异步方法
const muluName = 'act-reward'
mkdirs('output/' +muluName + '/js/', () => {
  console.log('js-done')
})
mkdirs('output/' +muluName + '/css/', () => {
  console.log('css-done')
})

// 添加 scss 文件。把comman.scss 文件内容复制一份到新建的 scss 文件当中去。
function creatCommonFile(commondDirname, inputDirname) {
  fs.readFile(commondDirname, 'utf8', function (_err, data) {
    console.log(data)
    fs.writeFile(inputDirname, data.replace(/{{systemName}}/g, 'act').replace(/{{muluName}}/g, muluName), function (err) {
      if (err) {
        return console.error(err)
      }
      console.log('数据写入成功！')
      console.log('--------我是分割线-------------')
    })
  })
}
creatCommonFile('common/_common.scss', 'output/' + muluName + '/css/' + muluName + '.scss');
creatCommonFile('common/_common.js', 'output/' + muluName + '/js/' + muluName + '.js');
creatCommonFile('common/_common.html', 'output/' + muluName + '/' + muluName + '.html');
creatCommonFile('common/_common.html', 'output/' + muluName + '/content.txt');
creatCommonFile('common/mock_data.js', 'output/' + muluName + '/js/mock_data.js');
// 递归创建目录 同步方法
/* 结果是：控制台没有打印出来 */
// mkdirsSync('hello/aa/bb/cc', () => {
//   console.log('done')
// })
