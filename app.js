const express=require('express');
const chalk=require('chalk');
const path=require('path'); 
const playerdata= require('./src/model/playerData'); 

var app =new express();
const nav=[{link:'/managers',title:'MANAGERS'},
            {link:'/players',title:'PLAYER'},
            {link:'/addplayer',title:'ADD PLAYER'},
            {link:'/managerau',title:'ADD MANAGERS'}];



var p1=path.join(__dirname,'/views');
app.use(express.static(path.join(__dirname,"/src")))

app.set('views','./src');
app.set('view engine','ejs');


app.route('/')
    .get((req,res)=>{
        playerdata.find()
        .then(function(players){
            res.render('index',{nav,title:'Home',players});
        });        
    });

const addplayeRoutes=require('./src/routes/addplayerRoutes')(nav);
app.use('/addplayer',addplayeRoutes)
    
const playersRouter=require('./src/routes/playerRoute')(nav);
app.use('/players',playersRouter)

const managerAuRouter=require('./src/routes/managerAuRoutes')(nav);
app.use('/managerau',managerAuRouter)

const managers=require('./src/routes/managerRoutes')(nav);
app.use('/managers',managers)



app.listen(4000,function(){
    console.log(chalk.red('listening to')+chalk.green('\tprot')+chalk.red('\t=\t')+chalk.green('4000'));
});