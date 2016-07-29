'use strict';

var app = require('../..');
import request from 'supertest';

var newDepartement;

describe('Departement API:', function() {

  describe('GET /api/departements', function() {
    var departements;

    beforeEach(function(done) {
      request(app)
        .get('/api/departements')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          departements = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(departements).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/departements', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/departements')
        .send({
          name: 'New Departement',
          info: 'This is the brand new departement!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDepartement = res.body;
          done();
        });
    });

    it('should respond with the newly created departement', function() {
      expect(newDepartement.name).to.equal('New Departement');
      expect(newDepartement.info).to.equal('This is the brand new departement!!!');
    });

  });

  describe('GET /api/departements/:id', function() {
    var departement;

    beforeEach(function(done) {
      request(app)
        .get('/api/departements/' + newDepartement._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          departement = res.body;
          done();
        });
    });

    afterEach(function() {
      departement = {};
    });

    it('should respond with the requested departement', function() {
      expect(departement.name).to.equal('New Departement');
      expect(departement.info).to.equal('This is the brand new departement!!!');
    });

  });

  describe('PUT /api/departements/:id', function() {
    var updatedDepartement;

    beforeEach(function(done) {
      request(app)
        .put('/api/departements/' + newDepartement._id)
        .send({
          name: 'Updated Departement',
          info: 'This is the updated departement!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDepartement = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDepartement = {};
    });

    it('should respond with the updated departement', function() {
      expect(updatedDepartement.name).to.equal('Updated Departement');
      expect(updatedDepartement.info).to.equal('This is the updated departement!!!');
    });

  });

  describe('DELETE /api/departements/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/departements/' + newDepartement._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when departement does not exist', function(done) {
      request(app)
        .delete('/api/departements/' + newDepartement._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
