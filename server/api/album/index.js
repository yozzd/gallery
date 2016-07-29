'use strict';

var express = require('express');
var controller = require('./album.controller');
var multipart = require('connect-multiparty');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.get('/find/bygroup', auth.isAuthenticated(), controller.bygroup);
router.put('/images/:id', auth.isAuthenticated(), multipart(), controller.images);
router.get('/download/:dir/:image', controller.download);

module.exports = router;
