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
  _id: String,
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
      _id: ObjectId,
      issue_title:	req.body.issue_title,
      issue_text: req.body.issue_text,
      created_on:	new Date(),
      updated_on:	new Date(),
      created_by:	req.body.created_by || "",
      assigned_to:	req.body.assigned_to || "",
      open:	true,
      status_text:	req.body.status_text || ""
      }, function(err));
  
    
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
    
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
