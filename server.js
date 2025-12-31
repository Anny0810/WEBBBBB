var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");

server.set("view engine", 'ejs');
server.set("views", __dirname+"/view")



server.use(express.static(__dirname + "/Public"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(fileUpload({limits:{fileSize:210241024}}))

var DB=require("nedb-promises");
/*用來存網站上的服務項目資料*/
var ServiceDB = DB.create(__dirname+"/Service.db");
/*建立一個 NeDB 資料庫檔案叫 Porfolio.db用來存作品集資料*/
var PorfolioDB = DB.create(__dirname+"/Porfolio.db");
/*處理「聯絡表單資料」的資料庫*/
var YOOOODB = DB.create(__dirname+"/YOOOO.db");


server.get("/", (req, res) => {
    res.send("Hello world!");
})
server.get("/services", (req, res) => {
    
    ServiceDB.find({},{_id:0}).then(results=>{
       
        res.send(results);
    }).catch(error=>{

    })
    
})

server.get("/portfolio", (req, res) => {

    PorfolioDB.find({}).then(results=>{
        res.send(results);
    })
    
})




server.get("/about", (req, res) => {
    res.send("Welcome " + req.query.user + " to My first NodeJS server!");
})


server.post("/YOOOO", (req, res) =>{
    console.log("收到表單:", req.body);
    YOOOODB.insert(req.body).catch(err => console.log(err));

    if(req.files && req.files.myFile1){
        var upFile=req.files.myFile1;
        upFile.mv(__dirname+"/Public/upload/"+upFile.name, function(err){
            if(err){
                res.render("msg",{message:"上傳檔案失敗NOOO: "+err});
            }else{
                res.render("msg",{message:"I got a file: "+upFile.name});
            }
        });
    }else{
        res.render("msg",{message:"沒有上傳檔案"});
    }
});


/**/
server.listen(80)