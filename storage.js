/**
 * 数据通信模块，负责各个模块之间的临时数据的通信。
 * 
 */

'use strict';

/**
 * 目前可能保存的数据
 * 
 * destination: 处理所有静态文件的临时系统目录文件夹
 * basePath:  部署工程所在的基本目录
 * version: 当前的静态资源版本号
 * 
 */
var data = {};

exports.set = function(key, value) {
  data[key] = value;
};

exports.get = function(key) {
  return data[key];
};