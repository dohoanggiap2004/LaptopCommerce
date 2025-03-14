const express = require('express')
const router = express.Router()
const CommentController = require('../../app//controllers/apiController/CommentController')
const verifyJWT = require('../../middlewares/verifyJWT')
const verifyRoles = require('../../middlewares/verifyRoles')

// router.get('/', verifyJWT, verifyRoles('user'), CommentController.getComments)
router.get('/', CommentController.getComments)
router.get('/:laptopId', CommentController.getCommentByLaptopId)
router.post('/', CommentController.createComment)
router.put('/', CommentController.updateComment)
router.delete('/', CommentController.deleteComment)

module.exports = router
