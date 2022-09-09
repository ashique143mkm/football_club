const express=require('express');
const path=require('path')
const playerdata = require('../model/playerData')
const addplayerRoutes=express.Router();

function router(nav){

addplayerRoutes.route('/')
    .get((req,res)=>{
        res.render('addplayer',{nav,title:"ADD PLAYER"});
    });

addplayerRoutes.route('/add').get((req,res)=>{
        
      var item = {
          name : req.param('player_name'),
          category : req.param('category'),
          age : req.param('age'),
          position : req.param('position')
      }

      var player =new playerdata(item);
      player.save();
      res.redirect('/addplayer');
    
    });   

  return addplayerRoutes;
  
}
    module.exports=router

