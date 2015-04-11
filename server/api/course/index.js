'use strict';

var express = require('express');
var controller = require('./course.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.post('/:id/views', controller.update_views);
router.delete('/:id', controller.destroy);
router.post('/:id/comments', controller.add_comment);
router.post('/:course_id/comments/:comment_id/replies', controller.add_reply);
router.get('/:id/comments', controller.userComments);
router.post('/:course_id/comments/:comment_id', controller.delete_comment);

module.exports = router;