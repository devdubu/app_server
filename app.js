const bodyParser = require('body-parser')
const express = require('express')
const { urlencoded } = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;


app.use(express.json())
app.use(urlencoded({ extended: "false"}))
app.use(express.urlencoded({ limit: "500mb", parameterLimit: 500000000 }));

var db;//어떤 데이터베이스에 저장할건지에 대한 변수 한개가 필요함

MongoClient.connect("mongodb+srv://admin1:wlsals0413@cluster0.x7knq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useUnifiedTopology:true},function(err, client){
    //데이터 베이스에 연결되면 할일
    if(err){
        return console.log(err);
    }

    db = client.db('loginapp');

    //db.collection('post').insertOne({이름 : 'John', _id : 100}, function(err,resu){
    //     console.log('저장완료');
    // }); 내가 지정한 db변수에 post 콜렉션에 insert한다. 앞에 따옴표가 저장할 데이터를 의미하고, 뒤는 콜백함수를 의미한다. 저장할 데이터는 object자료형 형태로 저장함
    // mongodb에서는 자료 저장시에는 _id를 적어야한다 만약 id를 적지 않는다면 임시적으로 id를 할당한다.
    app.listen(8080, function(){
        console.log('listening on 8080');
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body
    console.log(username, password)

    if(username === "pepper" && password =="123123"){
        res.status(200).json({
            message: "로그인 성공"
        })
    }else {
        res.status(403).json({
            message: "로그인 실패"
        })
    }
})
app.post("/String", (req, res) => {
  const str = req.body
  console.log(str)

})

app.post("/Register",(req,res)=>{
    const { RName, RPhoneNumber, REmail, RId, RPassword, RPasswordCon } = req.body;
    db.collection('personal_information').insertOne({Name : RName,PhoneNumber : RPhoneNumber, Email: REmail, ID : RId, Password : RPassword}, function(err,resu){
        console.log('저장완료');
   })
    console.log( RName, RPhoneNumber,REmail, RId, RPassword, RPasswordCon );
})

