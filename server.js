const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectdb = require('./config/db')
dotenv.config({path: './config/config.env'});
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const router = express.Router()
const ori = require('./public/calc_dist');

connectdb();

const app = express();


app.use(logger('dev'))
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extend:false}));
app.set('views',path.join(__dirname,'views'));  
app.set('view engine','hbs');
//app.get


async function ds(address,res){
    ori.distan(address).then(v=>{
        console.log("_____________________________START_");
   // console.log(array);
    //let array = ss();
    console.log(JSON.stringify(v));
    console.log("____________________________END__");
    
    ar = JSON.parse(JSON.stringify(v))
    console.log(ar);
    for(var i=0;i<ar.length;i++){
        ar[i] = JSON.parse(JSON.stringify(ar[i]));
    }
    console.log(ar[0]);

    //origin
    

    //every latitude and logitude
    //city
    //items
    //for(var i=0;i<)
    a = JSON.stringify(ar[0])
    ss = JSON.parse(a);
    var origin = []
    origin.push(ss.lat);
    origin.push(ss.lgt);

    var one = ar[1];
 
    var coo1 = []
    var coo2 = []
    var title = []
    var item = []
    one.geometry.coordinates[0]=22.29;
    one.geometry.coordinates[1]=73.19;
    one.properties.title = 'vadodara';
    one.properties.item = 'samta';
    console.log(ar[1].properties.item);
    for(var i=1;i<ar.length-1;i++){
        coo1.push(ar[i].geometry.coordinates[0]);
        coo2.push(ar[i].geometry.coordinates[1]);
        title.push(ar[i].properties.title);
        item.push(ar[i].properties.item);
    }
    var c1=[];
    var c2=[];
    var t=[];
    var it=[];
    for(var i=0;i<coo1.length;i++){
        coo1[i] = parseFloat(coo1[i]);
        coo2[i] = parseFloat(coo2[i]);
    }
    console.log(JSON.parse(JSON.stringify(coo1)));
    console.log(JSON.parse(JSON.stringify(coo2)));
    coo1 = JSON.parse(JSON.stringify(coo1))
    coo2 = JSON.parse(JSON.stringify(coo2))
    title = JSON.parse(JSON.stringify(title))
    item = JSON.parse(JSON.stringify(item))

    var o = {coo1:coo1[0],coo2:coo2[0],item:item[0],title:title[0]};
    var tt = {coo1:coo1[1],coo2:coo2[1],item:item[1],title:title[1]};
    var th = {coo1:coo1[2],coo2:coo2[2],item:item[2],title:title[2]};
    var fr = {coo1:coo1[3],coo2:coo2[3],item:item[3],title:title[3]};
    var fv = {coo1:coo1[4],coo2:coo2[4],item:item[4],title:title[4]};


    res.render('index',{origin:ss,o:o,tt:tt,th:th,fr:fr,fv:fv,coo1:coo1,coo2:coo2,title:title,item:item});
    });
    //let array = ori.distan();

}
app.get('/',function(req,res){
    res.render('loc');
});

app.post('/getlocate',(req,res)=>{
    console.log(req.body);
    console.log(req.body.loc)
    //res.send('created user');
    address = req.body.loc;
    ds(address,res);
    //res.redirect('/');
});


app.get('/loc',(req,res)=>{
    ds('vadodara',res);
        
})

app.use(express.static(path.join(__dirname,'public')));
app.use('/trucks',require('./routes/trucks').router);

/*
app.use(bodyParser.urlencoded({extend:false}));
app.use(cookieParser());
//app.set('views',path.join(__dirname,'views'));
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

app.get('/map',function(res,req){
    res.render('index.html',{array:array});
});
*/





const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>
    console.log(`server running on $(process.env.NODE_ENV) mode on port $(PORT)`)
);
