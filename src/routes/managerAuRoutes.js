const express=require('express');
const path=require('path')
const managerdata = require('../model/managerData')
const managerAuRoutes=express.Router();

function router(nav,players){

managerAuRoutes.route('/')
    .get((req,res)=>{
        res.render('managerau',{nav,title:"ADD MANAGER"});
    });
    
managerAuRoutes.route('/add').get((req,res)=>{
        
      var item = {
        manager_name : req.param('manager_name'),
        manager_sname : req.param('manager_sname'),
        phone_no : req.param('phone_no'),
        house_name : req.param('house_name')
      }

      var manager =new managerdata(item);
      manager.save();
      res.redirect('/managerau');
    
    });   

  return managerAuRoutes;
  
}
module.exports=router

