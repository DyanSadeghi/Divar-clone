const { Router } = require("express");
const PostController = require("./post.controller");
const { upload } = require("../../common/utils/multer");
const Authorization = require("../../common/guard/authorization.guard");

const router = Router();

router.get("/create", Authorization,PostController.createPostPage);
router.post(
  "/create",
  Authorization,
  upload.array("images", 10),
  PostController.create
);
router.get("/my", Authorization, PostController.findMyPost);
router.delete("/delete/:id", Authorization, PostController.remove);
router.get("/:id",  PostController.showPost);
;

module.exports = {
  PostRouter: router,
};
