/**
 * 移动文件到指定的版本目录，以备后续的文件处理
 *
 * @author Ji Peng (jipeng@btte.net)
 *
 */

'use strict';

var ncp = require('ncp'),
    tmp = require('tmp');


var utils = require('../utils'),
    storage = require('../storage');
var basePath = storage.get('basePath');
var destination = basePath+'/./tempfile'; //tmp.dirSync().name;
    storage.set('destination', destination);

exports.run = function (callback) {
  
  var staticfolder = basePath + '/../static';

  utils.log('复制目录 ' + staticfolder + ' 到目标目录 ' + destination + '\n');
  ncp(staticfolder, destination, function(){
  	callback();
  });
};