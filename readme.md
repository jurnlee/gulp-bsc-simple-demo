
# gulp-bsc-simple-demo : gulp-browsersync-simple-demo

**简述**    
这个Demo是使用Gulp+browersSync实现实时编辑预览并打包压缩html,js,css的最简单方式，由于很多细节并未完善，本Demo目前仅适用于测试与小项目最终打包使用，对于大型前端来说效率还是堪忧；此后再进行慢慢优化。   
生产完整的任务可参考 https://github.com/guotie/gulp-example/blob/master/gulpfile.js    

**安装环境 install**   

如果没有安装node.js与npm请自行搜索下载安装；   
另外国内推荐更换成淘宝源；   

安装好后执行如下命令进行项目的安装：  
```
npm install 
bower install

```

**文件结构说明**    
```
- bower_components/    安装bower管理的组件后生成，不能删除；
- node_modules/        安装node依赖包生成，不能删除；
- src/                 要编辑的源文件，分别放置于html,js,css文件夹下，serve与监听文件变化的根目录；
- dist/                最终打包生成的目录，结构将与src一致；
```
