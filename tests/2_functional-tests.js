/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'text');
          assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
          assert.equal(res.body.assigned_to, 'Chai and Mocha');
          assert.equal(res.body.status_text, 'In QA');
          assert.equal(res.body.open, true);
                
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Required',
          issue_text: 'Required',
          created_by: 'Required fields filled in'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Required');
          assert.equal(res.body.issue_text, 'Required');
          assert.equal(res.body.created_by, 'Required fields filled in');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          assert.equal(res.body.open, true);
        
          done();
        })
        
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: '',
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Please submit required fields');
          done();
        })
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '5da99c1008a5c800812de9ae',
          issue_title: '',
          issue_text: '',
          created_by: '',
          assigned_to: '',
          status_text: '',
          open: undefined
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'No updated field sent');
          
          done();
        })
      });
      
      test('One field to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '5da99c1008a5c800812de9ae',
          issue_title: '',
          issue_text: '',
          created_by: 'One Field to update',
          assigned_to: '',
          status_text: '',
          open: undefined
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.success, 'successfully updated 5da99c1008a5c800812de9ae');
          
          done();
        })
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: '5da99c1008a5c800812de9ae',
          issue_title: '',
          issue_text: '',
          created_by: 'Multiple Fields to update',
          assigned_to: 'Multiple Fields to update',
          status_text: '',
          open: undefined
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.success, 'successfully updated 5da99c1008a5c800812de9ae');
          
          done();
        })
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({issue_title: 'Required'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          res.body.forEach((d)=>
          assert.equal(d.issue_title, 'Required'));
          
          done();
          
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({issue_title: 'Required', created_after: '2019-10-17'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          res.body.forEach((d) => {assert.equal(d.issue_title, 'Required');});
          res.body.forEach((d) => {assert.isAbove(new Date(d.created_on), new Date('2019-10-17'));});
          
          done();
        });
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
        .delete('/api/issues/test')
        .send({_id: ''
        })
        .end(function(err, res){
          assert.equal(res.body.error, '_id error');
          done();
        })
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          _id: 'testTBD',
          issue_title: 'tbd',
          issue_text:'tbd',
          created_by:'tbd'
        })
        .delete('/api/issues/test')
        .send({_id: 'testTBD'})
        .end(function(err, res){
          assert.equal(res.body.success, 'deleted testTBD');
          
          done();
        });
          });
        })
      });
      
    
