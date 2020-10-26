const express = require('express')
const path = require('path')
var mysql = require('mysql')
const bodyParser = require('body-parser');
var fill_pdf = require('fill-pdf-utf8');
var alert = require('alert');


// var path = require('path');  
const PORT = process.env.PORT || 5000
var fs= require('fs');
var jsonx = [{"เลขที่บัญชี":"111000001","Account":"-","Parti":"-","ประเภทเลขอ้างอิง":"0","เลขอ้างอิง":"3102002277862","ประเภทบุคคล":"1","รหัสคำนำหน้า":"104","คำนำหน้านาม":"นาง","ชื่อ":"อรนุช","นามสกุล":"อัศวจิรัฐติกรณ์","ชื่อ (EN)":"ORANUCH","นามสกุล (EN)":"ASSAWAJIRATTIKORN","เพศ":"1","ที่อยู่ 1":"1 ซอยประชานิเวศน์ 3 ซอย 25/11 ถนนติวานนท์","ที่อยู่ 2":"ตำบลท่าทราย อำเภอเมืองนนทบุรี","ที่อยู่ 3":"จังหวัดนนทบุรี","รหัสไปรษณีย์":"11000","โทรศัพท์บ้าน":"-","โทรศัพท์ที่ทำงาน":"-","โทรศํพท์มือถือ":"0818125217","โทรสาร":"-","อีเมล์":"-","รหัสประเทศ":"000","สัญชาติ":"000","รหัสอาชีพ":"990","อื่นๆ":"อาชีพอิสระ","วันเกิด":"1964-04-16","เลขประจำตัวผู้เสียภาษี":"3102002277862","การหักภาษี":"Y","ผู้ติดต่อ":"-","ผู้มีอำนาจ":"-","รับผลประโยชน์ ธนาคาร":"004","สาขา":"0012224437","เลขที่บัญชี_1":"-","MKT Code":"093967","MKT Name":"นางสาวรัชญา ธราประไพ","Team Code":"-","Team Name":"-","KYCDate":"2020-07-20","SuitScore":"29","SuitDate":"2020-07-20","HightNetworth":"1","HightNetworthDate":"2020-07-20","FatcaDate":"2020-07-20","US":"0","Active":"1"},{"เลขที่บัญชี":"111000002","Account":"-","Parti":"-","ประเภทเลขอ้างอิง":"0","เลขอ้างอิง":"3100700429551","ประเภทบุคคล":"1","รหัสคำนำหน้า":"103","คำนำหน้านาม":"นาย","ชื่อ":"โสภณ","นามสกุล":"วีระโสภณ","ชื่อ (EN)":"sophon","นามสกุล (EN)":"verasophon","เพศ":"0","ที่อยู่ 1":"108 ซอยหลังสวน ถนนสารสิน","ที่อยู่ 2":"แขวงลุมพินี เขตปทุมวัน","ที่อยู่ 3":"กรุงเทพมหานคร","รหัสไปรษณีย์":"10330","โทรศัพท์บ้าน":"-","โทรศัพท์ที่ทำงาน":"-","โทรศํพท์มือถือ":"086-905-2999","โทรสาร":"-","อีเมล์":"-","รหัสประเทศ":"000","สัญชาติ":"000","รหัสอาชีพ":"990","อื่นๆ":"เกษียณอายุ","วันเกิด":"1933-10-11","เลขประจำตัวผู้เสียภาษี":"3100700429551","การหักภาษี":"Y","ผู้ติดต่อ":"-","ผู้มีอำนาจ":"-","รับผลประโยชน์ ธนาคาร":"004","สาขา":"0822563740","เลขที่บัญชี_1":"-","MKT Code":"093967","MKT Name":"นางสาวรัชญา ธราประไพ","Team Code":"-","Team Name":"-","KYCDate":"2020-07-20","SuitScore":"32","SuitDate":"2020-07-20","HightNetworth":"1","HightNetworthDate":"2020-07-20","FatcaDate":"2020-07-20","US":"0","Active":"1"},{"เลขที่บัญชี":"111000003","Account":"-","Parti":"-","ประเภทเลขอ้างอิง":"0","เลขอ้างอิง":"1609900165635","ประเภทบุคคล":"1","รหัสคำนำหน้า":"105","คำนำหน้านาม":"น.ส.","ชื่อ":"ครองขวัญ","นามสกุล":"ตันตระกูล","ชื่อ (EN)":"krongkwan","นามสกุล (EN)":"tantragul","เพศ":"1","ที่อยู่ 1":"ร้านบ้านนิชา 201/15-17 หมู่ที่ 1 ถนนเทศบาล1","ที่อยู่ 2":"ตำบลบ้านไร่ อำเภอบ้านไร่","ที่อยู่ 3":"จังหวัดอุทัยธานี","รหัสไปรษณีย์":"61140","โทรศัพท์บ้าน":"-","โทรศัพท์ที่ทำงาน":"-","โทรศํพท์มือถือ":"083-331-1200","โทรสาร":"-","อีเมล์":"-","รหัสประเทศ":"000","สัญชาติ":"000","รหัสอาชีพ":"910","อื่นๆ":"ร้านอาหาร","วันเกิด":"1991-01-19","เลขประจำตัวผู้เสียภาษี":"1609900165635","การหักภาษี":"Y","ผู้ติดต่อ":"-","ผู้มีอำนาจ":"-","รับผลประโยชน์ ธนาคาร":"069","สาขา":"2000676128","เลขที่บัญชี_1":"-","MKT Code":"093967","MKT Name":"นางสาวรัชญา ธราประไพ","Team Code":"-","Team Name":"-","KYCDate":"2020-07-20","SuitScore":"32","SuitDate":"2020-07-20","HightNetworth":"1","HightNetworthDate":"2020-07-20","FatcaDate":"2020-07-20","US":"0","Active":"1"}];
// var datajson = JSON.parse('test.json');
var users="";
var accName='';
var accFlag='';
fs.readFile("test.json", function(err, data) { 
      
  // Check for errors 
  if (err) throw err; 
 
  // Converting to JSON 
  users = JSON.parse(data); 
    
  //console.log(users); // Print users  
}); 
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))


  .use(bodyParser.urlencoded({ extended: false }))
  .set('view engine', 'ejs')
  
  .get('/', (req, res) => {
    var con = mysql.createConnection({
      host: "127.0.0.1",
      user: "kukkui",
      password: "kukkui",
      database: "kukkui"
    });
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "CREATE TABLE IF NOT EXISTS accounts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table Job Done");
      });

      var sql = "CREATE TABLE IF NOT EXISTS blogposts (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), content LONGTEXT)";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table Job Done");
      });
    }); 

    
  res.render('pages/login')
  })
  .post('/auth',(req, res) => {
    const userx = req.body.username;
    const passx = req.body.password;

    //Get username and generated password
    //Pass to the mysql DB 
    var con = mysql.createConnection({
      host: "127.0.0.1",
      user: "kukkui",
      password: "kukkui",
      database: "kukkui"
    });
   
    
    con.connect(function(err) {
    if (err) throw err;
      con.query("SELECT * FROM accounts WHERE username = '"+ userx +"'", function(err, result, field){
        if(result.length === 0){
          //new user logic
          var sql = "INSERT INTO accounts (username, password) VALUES ('"+userx+"', '"+passx+"')";
            con.query(sql, function (err, result) {
            if (err) throw err;
            // var data = JSON.stringify(result[0].name)
            console.log("New Accounts added");
            res.render('pages/dash',{datax:users})

            })
          }
          else{  
              //existing user, redirect to another page 
              const querystring="SELECT * FROM accounts WHERE username ='"+userx+"' AND password='"+passx+"'";
                con.query(querystring, function (err, result, fields) {
                  if(result.length === 0){
                    console.log("Wrong Password For Username : " + userx);
                    // alert("Wrong_Password_For:" + userx);
                    res.render('pages/auth',{accFlagx:"1",accNamex:userx})
                    // res.render('pages/customerx',{datax:users})
                
                  }
                  else{if (err) throw err;
                    var data = JSON.stringify(result[0].username)
                    console.log("Record Exist, Name: " + data);
                    res.render('pages/blogpost',{datax:users})
                 }
                })
            }
      })
    
  })
})
  .post('/checkacc',(req, res) => {
    const userx = req.body.username;
    var con = mysql.createConnection({
      host: "127.0.0.1",
      user: "kukkui",
      password: "kukkui",
      database: "kukkui"
    });

    
    con.connect(function(err) {
  
      if (err) throw err;
      con.query("SELECT * FROM accounts WHERE username = '"+ userx +"'", function(err, result, field){
        if(result.length === 0){
          //new user logic
            accFlag='0';
            res.render('pages/auth',{accFlagx:"0",accNamex:userx})

          }
          else{  
              //existing user, redirect to another page 
              accFlag='1';
            res.render('pages/auth',{accFlagx:"1",accNamex:userx})
          }
      })
    
  })
})
 

    .post('/pdf-fill-form', (req,res)=>{
      
          var col0 = req.body.col0;
          var col1 = req.body.col1;
          var col2 = req.body.col2;
          var col3 = req.body.col3;
          var col4 = req.body.col4;
          var col5 = req.body.col5;
          var col6 = req.body.col6;
          var col7 = req.body.col7;
          var col8 = req.body.col8;
          var col9 = req.body.col9;
          var col10 = req.body.col10;
          var col11 = req.body.col11;
          var col12 = req.body.col12;
          var col13 = req.body.col13;
          var col14 = req.body.col14;
          var col15 = req.body.col15;
          var col16 = req.body.col16;
          var col17 = req.body.col17;
          var col18 = req.body.col18;
          var col19 = req.body.col19;
          var col20 = req.body.col20;
          var col21 = req.body.col21;
          var col22 = req.body.col22;
          var col23 = req.body.col23;
          var col24 = req.body.col24;
          var col25 = req.body.col25;
          var col26 = req.body.col26;
          var col27 = req.body.col27;
          var col28 = req.body.col28;
          var col29 = req.body.col29;
          var col30 = req.body.col30;
          var col31 = req.body.col31;
          var col32 = req.body.col32;
          var col33 = req.body.col33;
          var col34 = req.body.col34;
          var col35 = req.body.col35;
          var col36 = req.body.col36;
          var col37 = req.body.col37;
          var col38 = req.body.col38;
          var col39 = req.body.col39;
          var col40 = req.body.col40;
          var col41 = req.body.col41;
          var col42 = req.body.col42;
          var col43 = req.body.col43;
          var col44 = req.body.col44;
          var col45 = req.body.col45;
          var soii = req.body.soii;
          var mhoo = req.body.mhoo;
          var housenumber = req.body.housenumber;
          var kwang = req.body.kwang;
          var district = req.body.district;
          var village = req.body.village;
          var road = req.body.road;
          var province = req.body.province;
          
          var one = req.body.one;
          var two = req.body.two;
          var three = req.body.three;
          var four = req.body.four;
          
      
       
      
           fill_pdf.generatePdf(
               {fields:
                   {
                      
                       Pre:col7,
                       Name:col8 + " " + col9,
                       FA:col35,
                       FAPositionName:col34,
                       HouseNumber:housenumber,
                       Mhoo:mhoo,
                       Village:village,
                       Soii: soii,
                       Road:road,
                       Kwang:kwang,
                       District:district,
                       Province:province,
                       Postal:col16,
                       one:one,
                       two:two,
                       three:three,
                       four:four
                   }
               },
               'public/pdf-template/TestForm4New.pdf',
               {fontSize: 10.0},
               'public/result.pdf',
               function (error, stdout, stderr) {
                   if(error){
                       throw error;
                   }
                   console.log(stdout);
                  
                   }
               )
              //   const filex = `${__dirname}/result.fdf`;
               // response.download(filex); // Set disposition and send it.
              res.redirect('/download');
              // response.send('DONE');
              // response.end();
               // Trigger the browser to download the PDF document
          
             
      })

      .get('/download', (req, res)=>{
    
        // var filePath = "./result.pdf";
    
        // fs.readFile(__dirname + filePath , function (err,data){
        //     res.contentType("application/pdf");
        //     res.send(data);
        // });
       
        var file = path.join(__dirname, '/result.xfdf');    
        res.download(file, function (err) {
           if (err) {
               console.log("Error");
               console.log(err);
           } else {
               console.log("Success");
           }    
        })
    })
    .post('/savepost', (req,res)=>{
      const summernotex = req.body.summernote_code;
      console.log(summernotex);
      var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "kukkui",
        password: "kukkui",
        database: "kukkui"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO blogposts (username, content) VALUES ('KukkuiSertis', '"+summernotex+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted into contents, ID: " + result.insertId);
          res.render('pages/dash',{datax:users})
        });
      });
    })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
