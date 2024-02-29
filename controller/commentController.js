const Post = require("../module/post")
const Comment = require("../module/comment");


exports.createComment = async (req, res) => {
    try {
        // fetch data from req body
        const { post, user, body } = req.body;
        // create a comment object
        const comment = new Comment({
            post, user, body
        });
        // save the comment into database
        const saveComment = await comment.save();

        // find the post by id, add new comment to component array
        const updatePost = await Post.findByIdAndUpdate(post , { $push: { comments: saveComment._id } }, { new: true })
            .populate("comments")
            .exec();

        res.json({
            post: updatePost,
        });

    } catch (error) {
         res.status(500).json({
            error: "error while creating comment"
        });

    }
}