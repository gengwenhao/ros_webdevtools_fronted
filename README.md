# 运行步骤

## 安装后端依赖

```shell
git clone https://gitee.com/gengwenhao/ros_webdevtools_api
cd ros_webdevtools_api
python3 manage.py migrate
python3 manage.py runserver
```

## 安装前端依赖

```shell
npm install ros_webdevtools_fronted
cd ros_webdevtools_fronted
npm run server
```

### 安装缓慢解决方法

#### 更换nvm源为淘宝镜像

##### 方法一（临时）

`NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node`

##### 方法二（永久）

在 ~/.bashrc 中添加下列语句

`export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node`
