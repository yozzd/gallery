/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/albums              ->  index
 * POST    /api/albums              ->  create
 * GET     /api/albums/:id          ->  show
 * PUT     /api/albums/:id          ->  update
 * DELETE  /api/albums/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Album from './album.model';

import fs from 'fs-extra';
import easyimage from 'easyimage';
import promise from 'bluebird';
import mime from 'mime';
promise.promisifyAll(fs);

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Albums
export function index(req, res) {
    return Album.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Album from the DB
export function show(req, res) {
    return Album.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Album in the DB
export function create(req, res) {
    Album.findOne({
            name: req.body.name,
            group: req.body.group
        }).exec()
        .then(find => {
            if (find) {
                throw 'The Album Name "' + req.body.name + '" has been registered! Please input another name'
            } else {
                var newAlbum = new Album({
                    name: req.body.name,
                    departement: req.user.departement,
                    initial: req.user.initial,
                    group: req.user.group,
                    timestamp: _.now(),
                    by: req.user.email
                })
                return newAlbum.save()
                    .then(saved => {
                        return saved;
                    })
            }
        })
        .then(album => {
            return fs.ensureDirAsync('./client/app/album/images/' + album._id)
                .then(() => {
                    return album;
                });
        })
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Album in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Album.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Album from the DB
export function destroy(req, res) {
    return Album.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .then(() => {
            return fs.removeAsync('./client/app/album/images/' + req.params.id)
        })
        .catch(handleError(res));
}

export function bygroup(req, res) {
    return Album.find({
            group: req.user.group
        }).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function images(req, res) {
    return promise.map(req.files.file, map => {
            return Album.findById(req.params.id).exec()
                .then(album => {
                    return easyimage.info(map.path)
                        .then(info => {
                            if (info.width > 1280) {
                                return easyimage.resize({
                                        src: map.path,
                                        dst: './client/app/album/images/' + album._id + '/original/' + map.name,
                                        width: 1280
                                    })
                                    .then(() => {
                                        return album;
                                    })
                            } else {
                                return fs.copyAsync(map.path, './client/app/album/images/' + album._id + '/original/' + map.name)
                                    .then(() => {
                                        return album;
                                    })
                            }
                        })
                })
                .then(album => {
                    return easyimage.info('./client/app/album/images/' + album._id + '/original/' + map.name)
                        .then(info => {
                            album.images.push({
                                name: map.name,
                                title: map.name.substring(0, map.name.length - 4),
                                width: info.width,
                                height: info.height,
                                size: info.size,
                                by: req.user.email,
                                departement: req.user.departement,
                                initial: req.user.initial,
                                timestamp: _.now()
                            })
                            return album.save();
                        })
                })
        })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function download(req, res) {
    var path = './client/app/album/images/' + req.params.dir + '/original/' + req.params.image;
    var mimetype = mime.lookup(path);

    res.setHeader('Content-disposition', 'attachment; filename=' + req.params.image);
    res.setHeader('Content-type', mimetype);
    res.download(path, req.params.image);
}
