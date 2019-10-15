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
  _id:	String,
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
      issue_title:	req.params.Title,
      issue_text: req.params.Text,
      created_on:	new Date(),
      created_by:	req.params.Created_by || "",
      assigned_to:	String,
      open:	Boolean,
      status_text:	String
      
    })
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
    
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
