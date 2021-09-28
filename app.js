const bodyParser = require('body-parser')
const express = require('express')
const { urlencoded } = require('express')
const app = express()

app.use(express.json())
app.use(urlencoded({ extended: "false"}))
app.use(express.urlencoded({ limit: "500mb", parameterLimit: 500000000 }));
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
    console.log( RName, RPhoneNumber,REmail, RId, RPassword, RPasswordCon );
})

app.listen(5000, () => {
    console.log('server started..')
})