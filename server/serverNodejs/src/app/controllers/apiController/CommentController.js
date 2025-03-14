const {
  getCommentsService,
  getCommentByLaptopIdService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
} = require("../../../services/apiService/commentService");
class CommentController {
  async getComments(req, res) {
    try {
      const comments = await getCommentsService();

      if (!comments) {
        return res.status(200).json({ message: "Comment not found" });
      }

      res.status(200).json({
        data: comments,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getCommentByLaptopId(req, res) {
    try {
      if (!req?.params?.laptopId)
        return res.status(400).json({ message: "Comment id is required" });

      const id = req.params.laptopId;
      const comment = await getCommentByLaptopIdService(id);

      if (!comment) {
        return res.status(200).json({ message: "Comment not found" });
      }

      res.status(200).json({
        data: comment,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createComment(req, res) {
    try {
      if (!req?.body)
        return res.status(400).json({ message: "Comment information is required" });

      const comment = req.body;
      const newComment = await createCommentService(comment);

      res.status(201).json({
        newComment: newComment,
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateComment(req, res) {
    try {
      if (!req?.body)
       return res.status(400).json({ message: "Comment information is required" });

      const comment = req.body;
      const [result] = await updateCommentService(comment);
    //   console.log(result)
      if (result === 0) return res.status(200).json({ message: "No comment changed" });

      res.status(200).json({
        rowsEffected: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteComment(req, res) {
    try {
      if (!req?.body)
        return res.status(400).json({ message: "Comment information is required" });

      const id = req.body.id;
      const result = await deleteCommentService(id);
      if (result === 0) return res.status(200).json({ message: "No comment be deleted" });

      res.status(200).json({
        rowsEffected: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new CommentController();
