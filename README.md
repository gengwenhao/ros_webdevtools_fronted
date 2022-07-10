<p align="center"><a href="//mooc.gengwenhao.cn" target="_blank" rel="noopener noreferrer"><img width="500" src="src/assets/logo.png" alt="logo"></a></p>
<h3 align="center">图形化模块编程的机器人控制方法</h3>
<p align="center">
	<a href="//github.com/gengwenhao/ros_webdevtools_fronted">
<img src="https://img.shields.io/github/license/gengwenhao/ros_webdevtools_fronted" alt="License">
</a>  
<a href="//github.com/gengwenhao/ros_webdevtools_fronted">
<img src="https://img.shields.io/pypi/pyversions/Django" alt="License">
</a> 
<a href="//github.com/gengwenhao/ros_webdevtools_fronted">
<img src="https://img.shields.io/github/repo-size/gengwenhao/ros_webdevtools_fronted">
</a> 
<a href="//github.com/gengwenhao/ros_webdevtools_fronted">
<img src="https://img.shields.io/github/languages/count/gengwenhao/ros_webdevtools_fronted">
</a> 
<a href="//github.com/gengwenhao">
<img src="https://img.shields.io/badge/github-gengwenhao-blue"/>
</a>
</p>

![首页预览](vue_mooc/public/首页.png)

---

# 介绍

> 需要开发一套图形化的机器人编程工具，借助于浏览器提供的 web 环境，实现可定制可拖拽的编程模块用于代码生成。生成的代码主要为 python 语言，运行依赖于 Linux 系统 和 ROS 环境，可应用于机器人的巡检、行进等批处理类型任务。

## 项目后端源码

[GitHub gengwenhao/ros_webdevtools_api](http://github.com/gengwenhao/ros_webdevtools_api/)

[码云 gengwenhao/ros_webdevtools_api](http://gitee.com/gengwenhao/ros_webdevtools_api/)

# 安装与运行

## 运行后端项目

```shell
git clone https://gitee.com/gengwenhao/ros_webdevtools_api
cd ros_webdevtools_api
python3 manage.py migrate
python3 manage.py runserver
```

## 运行前端项目

```shell
yarn install ros_webdevtools_fronted
cd ros_webdevtools_fronted
yarn server
```

### 解决前端依赖安装缓慢

#### 更换 nvm 源为淘宝镜像

##### 方法一（临时）

`NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node`

##### 方法二（永久）

在 ~/.bashrc 中添加下列语句

`export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node`
