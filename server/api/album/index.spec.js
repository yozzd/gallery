'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var albumCtrlStub = {
  index: 'albumCtrl.index',
  show: 'albumCtrl.show',
  create: 'albumCtrl.create',
  update: 'albumCtrl.update',
  destroy: 'albumCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var albumIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './album.controller': albumCtrlStub
});

describe('Album API Router:', function() {

  it('should return an express router instance', function() {
    expect(albumIndex).to.equal(routerStub);
  });

  describe('GET /api/albums', function() {

    it('should route to album.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'albumCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/albums/:id', function() {

    it('should route to album.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'albumCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/albums', function() {

    it('should route to album.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'albumCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/albums/:id', function() {

    it('should route to album.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'albumCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/albums/:id', function() {

    it('should route to album.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'albumCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/albums/:id', function() {

    it('should route to album.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'albumCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
