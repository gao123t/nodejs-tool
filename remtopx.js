'use strict'
/*
* remtopx.js
*/
const fs = require('fs')
const postcss = require('postcss')
const remtopx = require('postcss-remtopx')

fs.readFile('src/input.css', function (_err, data) {
  const content = data
  // console.log("content----------" + content);
  const writeContent = postcss([remtopx({
    rootFontSize: 64
  })]).process(content)

  fs.writeFile('src/output.css', writeContent, function (err) {
    if (err) {
      return console.error(err)
    }
    console.log('数据写入成功！')
    console.log('--------我是分割线-------------')
    console.log('读取写入的数据！')
  })
})
