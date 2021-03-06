# 031802223-031802219

## 目录结构

```
  ├── public   index.html
  ├── css
  │   ├── bootstrap.min.css 
  │   └── global.css 
  └── js
      ├── echarts.min.js  
      ├── global.js
      └── jquery-3.4.1.js
```
+ css目录中放的是index页面使用到的样式，包括了bootstrap和自己编写的一些全局样式。
+ js目录中放的是javascript文件，echarts.js帮助我们快速生成树状图，global.js负责字符串的解析和树状图的呈现，jquery-3.4.1.js让我们更方便的操作dom。
+ test目录中放的是测试的代码
## 使用说明
- 将项目下载到本地， index.html是主页面，直接双击项目文件夹中的index.html或右键选择浏览器打开就能运行我们的网页。
- 输入格式
```
导师：张三
2016级博士生：天一、王二、吴五
2015级硕士生：李四、王五、许六
2016级硕士生：刘一、李二、李三
2017级本科生：刘六、琪七、司四

刘六：JAVA、数学建模

李二：字节跳动、京东云


导师：张四
……
```
- 每个学术家族树的输入如上所示，"导师："，"级博士生："，"级硕士生："，"级本科生："和"、"是关键词，分号是中文分号。上半部分是人员信息，下半部分是技能树或所在公司历程。若有多组学术家族树的输入数据，需要在组间空两行。请依照格式输入，否则会有报错提醒。
- 点击生成后会生成每组测试数据对应的学术家族树图，每个非叶节点均可缩放和展开，点击学生节点（小圆圈）会显示学生的技能或经历（如果有输入的话）
## 项目特色
+ 支持文件上传和保存学术家族树图
项目支持将txt文件作为输入，方便用户在本地组织输入数据，且能保存每张树图，省去了截图的麻烦。