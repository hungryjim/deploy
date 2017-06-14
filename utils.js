/**
 * 通用工具类方法，用于封装一些基本的通用方法等等。
 * 
 */

'use strict';

var fs = require('fs'),
  crypto = require('crypto');

exports.getTime = function (format) {
  var now = new Date();

  var o = {
    "M+": now.getMonth() + 1,
    "d+": now.getDate(),
    "h+": now.getHours(),
    "m+": now.getMinutes(),
    "s+": now.getSeconds(),
    "q+": Math.floor((now.getMonth() + 3) / 3),
    "S": now.getMilliseconds()
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (now.getFullYear() + "")
      .substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }

  return format;
};

exports.generateVersion = function () {
  return Math.round(new Date().getTime() / 1000);
};

exports.log = function (str) {
  console.log(str);
};

exports.md5 = function (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

exports.removeSuffix = function (path) {
  var paths = path.split('.');
  if (paths.pop() == 'js') {
    return paths.join();
  }

  return path;
};

/**
 * 
 * 提取出来文件的后缀名信息
 * 
 * @String {path} 路径名称
 * 
 */
exports.extractSuffix = function (path) {
  var suffixExpress = /\.([^\.]+)$/;
  var results = suffixExpress.exec(path);
  var ext;
  try {
    ext = results[1];
  } catch (e) {
    ;
  }
  
  return ext;
};