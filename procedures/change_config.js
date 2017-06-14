/**
 * 调整模板文件中的配置文件，不仅限于freemaker，可能是ejs或者其他，通过修改配置文件达到修改版本号的效果。
 *
 * @author Ji Peng (jipeng@btte.net)
 *
 */

'use strict';

var fs = require('fs'),
    _ = require('underscore');

var storage = require('../storage.js'),
    utils = require('../utils.js');

var version = storage.get('version'),
    config;

var addVersion = function (content) {
  var versionExpress = /(\/static)(\/\d+)?/ig;

  return content.toString().replace(versionExpress, function ($0, $1) {
    utils.log('将静态地址替换为 ' + config.staticPath + '/' + version);
    return config.staticPath + '/' + version;
  });
};

/**
 * 单独修改某个文件的版本号
 * @param {String} file 需要修改文件的路径
 *
 */
var changefileVersion = function (file) {
  fs.writeFileSync(file, addVersion(fs.readFileSync(file)));
};

var changefilesVersion = function (files) {
  files.forEach(function (file) {
    changefileVersion(storage.get('basePath') + file);
  });
};

exports.run = function (callback) {
  utils.log('开始修改目录版本号！');

  var files = (config = storage.get('config')).versionFiles
  try {
    if (_.isString(files)) {

      // 更改单个文件
      changefileVersion(storage.get('basePath') + files);
    } else if (_.isArray(files)) {

      // 更改了多个文件的情况下
      changefilesVersion(files);
    }
    utils.log('版本号修改完成！');
    callback();
  } catch (e) {
    callback(e);
  }
};