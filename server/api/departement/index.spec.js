'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var departementCtrlStub = {
  index: 'departementCtrl.index',
  show: 'departementCtrl.show',
  create: 'departementCtrl.create',
  update: 'departementCtrl.update',
  destroy: 'departementCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var departementIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './departement.controller': departementCtrlStub
});

describe('Departement API Router:', function() {

  it('should return an express router instance', function() {
    expect(departementIndex).to.equal(routerStub);
  });

  describe('GET /api/departements', function() {

    it('should route to departement.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'departementCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/departements/:id', function() {

    it('should route to departement.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'departementCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/departements', function() {

    it('should route to departement.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'departementCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/departements/:id', function() {

    it('should route to departement.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'departementCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/departements/:id', function() {

    it('should route to departement.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'departementCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/departements/:id', function() {

    it('should route to departement.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'departementCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
