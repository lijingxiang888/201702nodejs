let express = require('express');
let path = require('path');
let fs = require('fs');
let app = express();
//root是静态文件根目录
// /css/index.css
// function static(root){
//   return function(req,res,next){
// // E:\201702nodejs\1.express\public/css/index.css
//     let realPath = path.join(root,req.path);
//     fs.exists(realPath,function(exists){
//         if(exists){
//             res.sendFile(realPath);
//         }else{
//             next();
//         }
//     })
//   }
// }
app.use(express.static(path.resolve('public'))); //这必须填写存放静态文件的文件夹的绝对路径，用path模块的resolve方法可以实现。
//静态文件中间件-用来响应对客户端的静态文件请求
app.get('/',function(req,res){
    //path must be absolute or specify root to res.sendFile
    //或 相当路径+{root:__dirname}，把文件读出来返回
    //res.sendFile('./index.html',{root:__dirname});
    res.sendFile(path.resolve('./index.html'));
});
//所有文件的路径都是相对于存放目录的，因此，存放静态文件的目录名不会出现在 URL 中。

app.listen(8080);