# deploy
公司的pc端技术选型是基于require.js+jquey+freeMaker等后端模板的非前后端分离架构，
需要特定的打包方案，具体可以参考网站
http://waimai.meituan.com/
http://www.pengyunliuxue.com/

### 整个过程主要是：
### “copy_files"：备份打包文件，
### "compress_js"：根据require.js模块化压缩混淆合并js,
### "replace_pictures"：替换css中的图片地址为cdn地址，
### "compress_css"：压缩合并混淆css文件
### "change_config"：打版本号
### "move_static"：发布到相应的缓存服务器里面
