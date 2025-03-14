
const { Comment } = require("../../app/models");
const getCommentsService = async () => {
  return await Comment.findAll();
};

const getCommentByLaptopIdService = async (laptopId) => {
  return await Comment.findAll({
      where: {
          laptopId: laptopId
      }
  });
};

const createCommentService = async (comment) => {
  return await Comment.create(comment);
};
const updateCommentService = async (comment) => {
    const { commentId, ...updateFields } = comment;

    return await Comment.update(updateFields, {
      where: {
        commentId: commentId
      }
    });
};

const deleteCommentService = async (id) => {
  return await Comment.destroy({
    where: {
        commentId: id
    }
  });
};

module.exports = { getCommentsService, getCommentByLaptopIdService, createCommentService, updateCommentService, deleteCommentService, };
