/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});
const Issue = mongoose.model('Issue', {
 
issue_title:	String,
issue_text: String,
created_on:	Date,
updated_on:	Date,
created_by:	String,
assigned_to:	String,
open:	Boolean,
status_text:	String
});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      Issue.find({}, function(err, data){
        if (err) return (err);
        res.send(data);
      })
    })
    
    .post(function (req, res){
      var project = req.params.project;
      Issue.create({
      issue_title:	req.body.issue_title,
      issue_text: req.body.issue_text,
      created_on:	new Date(),
      updated_on:	new Date(),
      created_by:	req.body.created_by || "",
      assigned_to:	req.body.assigned_to || "",
      open:	true,
      status_text:	req.body.status_text || ""
      }, function(err, data){
        if (err) return res.json({error:'Error saving to database'});
        res.json(data);
      });
  
    
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
        
      if (req.body.issue_title == '' && req.body.issue_text == '' && req.body.created_by == ''
          && req.body.assigned_to == '' && req.body.status_text == '' && req.body.open == undefined) {
        res.json({error: 'No updated field sent'});
      } else 
      Issue.findById(req.body._id, function(err, data){
        if (err) return res.json({error: 'could not update' + req.body._id});
        req.body.issue_title !== '' ? data.issue_title = req.body.issue_title : null;
        req.body.issue_text !== '' ? data.issue_text = req.body.issue_text : null;
        req.body.created_by !== '' ? data.created_by = req.body.created_by : null; 
        req.body.assigned_to !== '' ? data.assigned_to = req.body.assigned_to : null;
        req.body.status_text !== '' ? data.status_text = req.body.status_text : null;
        req.body.open !== undefined ? data.open = req.body.open : null;
        data.updated_on = new Date();
        data.save(function(err){
          if (err) return res.json({error: 'could not update' + req.body._id});
          res.json({success: 'successfully updated ' + req.body._id})
        })
        
      })
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      if (req.body._id == '') {
        res.json({error: '_id error'});
      } else
      Issue.findByIdAndDelete(req.body._id, function(err){
        if (err) return res.json({failed: 'could not delete ' + req.body._id})
        res.json({success:  'deleted '+ req.body._id})
      })
    });
    
};
