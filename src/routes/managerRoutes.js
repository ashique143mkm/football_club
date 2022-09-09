const express=require('express');
const mongoose=require('mongoose');
var bodyParser = require('body-parser');
const manager=express.Router();
const managerdata= require('../model/managerData');
manager.use(bodyParser.urlencoded({ extended: false }));
manager.use(bodyParser.json());
function router(nav,players){

manager.route('/')
    .get((req,res)=>{
    managerdata.find()
        .then(function(managers){
            res.render('managers',{nav,title:'Managers',managers});
        });        
    });

manager.route('/:id')
    .get((req,res)=>{
        const id=req.params.id;
    managerdata.findOne({_id:id})
        .then(function(manager){
        res.render('manager',{nav,title:"footballclub",manager});             
    });
    });

manager.post('/:id/delete', function(req, res){
    const o_id=req.params.id;
    console.log(o_id);
    managerdata.findByIdAndRemove({_id:o_id}, 
	   function(err, docs){
		if(err) res.json(err);
		else    res.redirect('/managers');
	});
    });
manager.post('/editmanager/:id', function(req, res, next){
    console.log("show edit");
    const o_id=req.params.id;
    console.log(o_id);

    managerdata.findById({_id:o_id}).then(function(result,err) {
        if(err) return;
        console.log(result);
		
		
		if (!result) {
			req.flash('error', 'User not found with id = ' + req.params.id)
            res.redirect('/managers')
            console.log("error editing");
		}
		else { 
        	console.log("editing....show");
			res.render('editmanager', {nav,
				title: "UPDATE MANAGER DATA",
				id: result._id,
				manager_name: result.manager_name,
				manager_sname: result.manager_sname,
                phone_no: result.phone_no,
                house_name: result.house_name				
			})
		}console.log("editing....show 2");
	    })	
    })

manager.post('/editmanager/editing/:id', function(req, res, next) {
    
       const o_id=req.params.id;
       console.log(o_id);
       console.log("updated");
    managerdata.updateOne({_id:o_id},{
           manager_name:req.body.manager_name,
           manager_sname:req.body.manager_sname,
           phone_no:req.body.phone_no,
           house_name:req.body.house_name
    },function(err, result) {
             
           console.log("updated 2");
           });
           console.log("updated 3");
           res.redirect('/managers');
        });

    return manager
    }

module.exports=router

