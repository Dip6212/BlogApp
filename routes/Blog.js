const express=require("express");
const router=express.Router();

const {createComment} = require("../controller/commentController");
const {createPost,getAllPost} = require("../controller/postController");
const {createLike, createUnlike} = require("../controller/likeController");


router.post("/comments/create",createComment)
router.post("/posts/create",createPost)
router.get("/posts",getAllPost)
router.post("/likes/like",createLike)
router.post("/likes/unlike",createUnlike)

module.exports = router;