/**
 * 替换CSS文件中的图片的路径，将图片的地址指向CDN
 *
 * @author Ji Peng
 *
 */

'use strict';

var utils = require('../utils.js'),
    storage = require('../storage.js'),
    fs = require('fs');

var suffixExpress = /\.([^\.]+)$/,
    staticExpress = /(\/static)/ig;
    
var destination = storage.get('destination');

var replaceCSS = function (path) {
  var config = storage.get('config');  

  var filesList = fs.readdirSync(path);

  filesList.forEach(function (currentFile) {
    var tPath = path + '/' + currentFile;
    if (fs.statSync(tPath).isDirectory()) {
      replaceCSS(tPath);
    } else {

      var results = suffixExpress.exec(tPath);
      var ext;
      try {
        ext = results[1];
      } catch (e) {;
      }
      if (ext == 'css') {
        var CSSContent = fs.readFileSync(tPath).toString().trim();

        var targetContent = CSSContent.replace(staticExpress, function ($0) {
          utils.log('替换' + tPath.replace(destination, '') + '中的图片地址！');
          return config.staticPath;
        });

        fs.writeFileSync(tPath, targetContent);
      }
    }
  });
};

exports.run = function (callback) {
  try {
    utils.log('开始替换CSS中的图片静态地址！');
    utils.log('请稍后...');

    replaceCSS(storage.get('destination') + '/css');

    utils.log('替换成功！\n');
    callback();
  } catch (e) {
    callback(e);
  }
};