/**
 * 1. 第一次访问的时候，咖啡厅会送给1000元的余额
 * 2. 以后每次访问的时候，都会扣掉100元.
 */

let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
app.use(cookieParser());

//声明一个sessions，这里放着所有的会话数据
let sessions = {};
//const声明一个只读的常量。一旦声明，就不可更改。这个是客户端与服务器里的会话数据唯一的联系凭证
const SESSION_KEY = 'connect.sid';

app.get('/visit',function(req,res){
    //看看客户端有没有带sessionId到服务器
   let sessionId = req.cookies[SESSION_KEY];
   if(sessionId){
       //如果有这个id，那么找到这个id对应的会话状态
       let sessionObj = sessions[sessionId];
       //如果这个id对应的会话数据存在
       if(sessionObj){
           sessionObj.balance -= 100;
           res.send(`亲爱的顾客，欢迎你的再次光临,卡上余额${sessionObj.balance}元`);
       }else{
           //如果这个id对应的会话状态不存在，那么执行 newCard()函数
           newCard();
       }
   }else{//第一次的时候肯定是没有sessionId的

       newCard();
   }

   function newCard(){
       //sessionId第一保证唯一 第二要保证不容易被猜出来，所以用时间戳+随机数
       let newSessionId = Date.now()+''+Math.random();
       //在服务器端开辟一块内存，记录此卡号的数据
       sessions[newSessionId] = {balance:1000};
       res.cookie(SESSION_KEY,newSessionId);
       res.send(`亲爱的顾客，欢迎你的第一次光临,送你一张会员卡，卡上余额1000元`);
   }
});

app.listen(8080);