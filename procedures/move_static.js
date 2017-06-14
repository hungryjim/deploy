/**
 * 将静态文件移动到CDN指定的地点
 *
 * @author Ji Peng (jipeng@btte.net)
 *
 */
'use strict';

var storage = require('../storage.js'), utils = require('../utils.js');
var ncp = require('ncp'), rimraf = require('rimraf'), async = require('async'), fs = require('fs');


// 目标静态文件所在的临时目录

var destination = storage.get('destination'), staticfolder = storage.get('basePath') + '/../static', version = storage.get('version');

// 创建目标目录
var createTarget = function (callback) {
  async.series([
    function (callback) {

      // 创建前端根目录
      utils.log('创建目录' + staticfolder + '/' + version);
      fs.mkdir(staticfolder + '/' + version, callback);
    },
    function (callback) {

      // 创建css目录
      fs.mkdir(staticfolder + '/' + version + '/css', callback);
    }], callback);
};

// 移动文件
var moveFiles = function (callback) {
  async.series([
    function (callback) {

      // 移动最终合并后的目标css文件
      ncp(destination + '/css/global.css', staticfolder + '/' + version + '/css/global.css', callback);
    }, function (callback) {

      // 移动当页的css文件
      ncp(destination + '/css/page', staticfolder + '/' + version + '/css/page', callback);
    }, function (callback) {

      // 移动目标js文件
      ncp(destination + '/js', staticfolder + '/' + version + '/js', callback);
    }, function (callback) {

      // 移动目标fonts文件
      fs.exists(destination + '/css/fonts', function (result) {
        if (result) {
          ncp(destination + '/css/fonts', staticfolder + '/' + version + '/css/fonts', callback);
        } else {
          callback();
        }
      });;
    }, function (callback) {

      // 移动图片文件
      ncp(destination + '/img', staticfolder + '/' + version + '/img', callback);
    }], callback);
};

// 清理文件
var cleanFiles = function (callback) {
  utils.log('清理目录' + destination);
  rimraf(destination, callback);
};

exports.run = function (callback) {
  utils.log('开始文件移动以及清理...');
  async.series([createTarget, moveFiles, cleanFiles], callback);
};