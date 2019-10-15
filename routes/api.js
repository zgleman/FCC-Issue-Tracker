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
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      const incoming = new Issue({
      issue_title:	req.params.issue_title,
      issue_text: req.params.issue_text,
      created_on:	new Date(),
      created_by:	req.params.created_by || "",
      assigned_to:	req.params.assigned_to || "",
      open:	true,
      status_text:	req.params.status_text || ""
      });
    incoming.save();
    res.json({incoming});
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
    
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
