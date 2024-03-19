// This is a token verification system
const articleModel = require("../../Models/v1/article.schema");
const articleService = require("../../Services/v1/article.service");

module.exports = async (req, res, next) => {
  const articleId = req.params.articleId;
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      const result = await articleModel.findOne({ articleId: articleId });
      if (result) {
        console.log(result.view);
        await articleModel.updateMany(
          { articleId: articleId },
          { view: result.view + 1 }
        );
        next();
      } else {
        res.status(404).json({
          status: "error",
          message: "Article not found",
        });
      }
    } else {
      res.status(401).json({
        status: "error",
        message: "Unauthorized: Token not provided",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Invalid token or other error",
      error: error.message,
    });
  }
};
