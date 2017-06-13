let http = require('http');
let url = require('url');
http.createServer(function(req,res){
  let {pathname,query} = url.parse(req.url,true);
  if(pathname === '/write'){ //如果浏览器请求这个路径，说明是第一次访问，那就写入cookie
      //通过响应头写入cookie
      res.setHeader('Set-Cookie',['home=beijing','gender=boy']);
      res.end('write ok');
  //客户端再次访问服务器的时候要把cookie带回给服务器
  }else if(pathname === '/read'){//如果浏览器请求这个路径，说明是不是第一次访问，那就可以直接获取请求头里带回的cookie来辨别用户身份
     let cookie = req.headers.cookie; //取请求头中字段的时候都必须用小写字母来取
      res.end(cookie);
  }else{
      res.end('404');
  }
}).listen(8080);