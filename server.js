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

app.set('views',path.join(__dirname,'views'));  
app.set('view engine','hbs');
app.post('/getlocate',function(req,res){
    res.redirect('/')
});
app.get('/',(req,res)=>{

    ori.distan.then(v=>{
        console.log("_____________________________START_");
   // console.log(array);
    //let array = ss();
    console.log(v);
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

    
    for(var i=0;i<ar.length-1;i++){

    }
    res.render('index',{origin:ss});
    })
    //let array = ori.distan();
    
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
