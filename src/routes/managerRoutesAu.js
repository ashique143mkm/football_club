const express=require('express');
const mongoose=require('mongoose');
const managerAuRoutes=express.Router();
const managerData= require('../model/managerData') 
function Router(nav){



managerAuRoutes.route('/')
    .get((req,res)=>{
    managerData.find()
        .then(function(managers){
            res.render('managers',{nav,title:'Club',managers});
        });        
    });

managerAuRoutes.route('/:id')
    .get((req,res)=>{
        const id=req.params.id;
    managerData.findOne({_id:id})
        .then(function(managers){
        res.render('managers',{nav,title:"Club",managers});             
    });
});
  return managerAuRoutes
  
}
    module.exports=Router
