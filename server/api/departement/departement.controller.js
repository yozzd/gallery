/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/departements              ->  index
 * POST    /api/departements              ->  create
 * GET     /api/departements/:id          ->  show
 * PUT     /api/departements/:id          ->  update
 * DELETE  /api/departements/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Departement from './departement.model';

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

// Gets a list of Departements
export function index(req, res) {
    return Departement.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Departement from the DB
export function show(req, res) {
    return Departement.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Departement in the DB
export function create(req, res) {
    Departement.findOne({
            name: req.body.name
        }).exec()
        .then(find => {
            if (find) {
                throw 'The Departement Name "' + req.body.name + '" has been registered! Please input another name'
            } else {
                var newDepartement = new Departement({
                    name: req.body.name,
                    initial: req.body.initial,
                    group: req.body.group,
                })
                return newDepartement.save()
                    .then(saved => {
                        return saved;
                    })
            }
        })
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Departement in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Departement.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Departement from the DB
export function destroy(req, res) {
    return Departement.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
