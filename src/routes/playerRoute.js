const express=require('express');
const playerRouter=express.Router();
const playerdata= require('../model/playerData');
const mongoose=require('mongoose');
var bodyParser = require('body-parser');
playerRouter.use(bodyParser.urlencoded({ extended: false }));
playerRouter.use(bodyParser.json());
function Router(nav,players){

playerRouter.route('/')
    .get((req,res)=>{
    playerdata.find()
        .then(function(players){
            res.render('players',{nav,title:'Players',players});
        });        
    });

playerRouter.route('/:id')
    .get((req,res)=>{
        const id=req.params.id;
        console.log(id);
    playerdata.findOne({_id:id})
        .then(function(player){
        res.render('player',{nav,title:"footballclub",player});             
    });
});


playerRouter.post('/:id/delete', function(req, res){
    const o_id=req.params.id;
    console.log(o_id);
    playerdata.findByIdAndRemove({_id:o_id}, 
	   function(err, docs){
		if(err) res.json(err);
		else    res.redirect('/players');
	});
});


playerRouter.post('/editplayer/:id', function(req, res, next){
    console.log("show edit");
    const o_id=req.params.id;
    console.log(o_id);

    playerdata.findById({_id:o_id}).then(function(result,err) {
        if(err) return;
        console.log(result);
		
		
		if (!result) {
			req.flash('error', 'User not found with id = ' + req.params.id)
            res.redirect('/players')
            console.log("error editing");
		}
		else { 
        	console.log("editing....show");
			res.render('editplayer', {nav,
				title: "UPDATE PLAYER DATA",
				id: result._id,
				name: result.name,
				category: result.category,
                age: result.age,
                position: result.position				
			})
		}console.log("editing....show 2");
	    })	
    })

playerRouter.post('/editplayer/editingplayer/:id', function(req, res, next) {
    
       const o_id=req.params.id;
       console.log(o_id);
       console.log("updated");
    playerdata.updateOne({_id:o_id},{
            name:req.body.name,
            category:req.body.category,
            age:req.body.age,
            position:req.body.position
    },function(err, result) {
             
           console.log("updated 2");
           });
           console.log("updated 3");
           res.redirect('/players');
        });

  return playerRouter
  
}
    module.exports=Router
