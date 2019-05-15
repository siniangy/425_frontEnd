# 425_frontEnd

#### NBA赛事数据可视分析系统前端代码

1：前端代码基于全栈"MERN"架构开发，MongoDB+Express+React+Node。  

2：代码运行在Node，通过webpack打包，node版本V10.13.0（最好不要低于V8）

3：说明：
1. 视频测试数据是2019年3月1号的比赛数据，其中以公牛对阵老鹰为例
2. react-router瞎写的，存在刷新bug
3. 没有使用到redux
4. webpack也没优化
```
<!--数据库默认已经装入数据，获取爬虫代码在425_spider-->
python3 xxx.py
<!--安装cnpm淘宝镜像-->
npm install -g cnpm --registry=https://registry.npm.taobao.org
<!--安装npm包-->
cnpm install
cnpm install nodemon -g
<!--启动服务器（nodemon监听服务端变化）-->
npm run start
<!--启动客户端，运行在3000端口-->
npm run webpack
<!--打包部署-->
npm run build
```

查看.gitignore文件，所需要的视频测试数据在百度网盘
```
<!--testVideos-->
链接：https://pan.baidu.com/s/1P50Y_uy4q6my5oMVJruvQw 
提取码：wo7b 
<!--415-->
链接：https://pan.baidu.com/s/1tImHJ6w8dRw2XN8AZPgn9Q 
提取码：zp80 
```
