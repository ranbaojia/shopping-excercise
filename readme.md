### 项目说明文档
- 一般与项目放在一起
### git操作

### 初始化版本库
- git init
- 出现master说明初始化成功
- 初始化成功后当前目录下有个隐藏文件，git（不要管）
### 工作区
- 持有实际文件
- 我们平时增删改查的文件
  
### 提交到暂存区
- 可以理解为我们看不到一个地方
- 我们本地仓库的一个主要组成部分
### 本地仓库
- 可以理解为我们看不到一个地方
- 也是存在用户电脑中的
- 用于存储项目代码及版本项目记录等信息
  ### 提交到暂存区(必须)

- git add 文件名
- 将工作区的变动提交到暂存区
  ### 查看工作区和暂存区状态
- git status
- 查看工作区和暂存区的状态
### 配置全局信息
- 输入用户名
### 提交到本地仓库
- git commit -m '提交注释'
- 将代码从暂存区提交到本地仓库
- git status 查看状态：工作区是干净的，没有任何东西需要提交
  ### 关键操作
- git init ->创建版本库
- git add文件名 ->添加到暂存区
- git commit -m'提交注释'->提交到本地仓库
- git status 查看暂存区和工作区状态
### 查看日志
- git log
- git reflog
### 版本回退
- git reset --hard HEAD^回退到上一个版本
- git reset --hard 版本号
- 修改变动
### 创建远程仓库
- 进入github官网
### 将本地仓库和远程仓库关联
- git remote add origin 你的远程仓库地址
### 将本地仓库提交到远程仓库
- git push -u origin master  第一次提交到远程
- git push 将本地仓库提交到远程仓库
- -u origin master 设置默认的提交地址和分支
### 陪sshkey就不用每次输入用户名和密码
删除原先远程路径
$ git remote rm origin
