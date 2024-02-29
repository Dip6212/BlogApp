const Post = require("../module/post")
const Like = require("../module/like");


exports.createLike = async (req, res) => {
    try {
        // fetch data from req body
        const { post, user } = req.body;
        // create a comment object
        const like = new Like({
            post, user
        });
        // save the comment into database
        const saveLike = await like.save();

        // find the post by id, add new comment to component array
        const updatePost = await Post.findByIdAndUpdate(post , { $push: { likes: saveLike._id } }, { new: true })
            .populate("likes")
            .exec();

        res.json({
            post: updatePost,
        });

    } catch (error) {
         res.status(500).json({
            error: "error while creating like"
        });

    }
}


exports.createUnlike = async (req, res) => {
    try {
        // fetch data from req body
        const { post, like } = req.body;
        // find and delete from like collection
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like})

        // delete from like collection
        const updatePost = await Post.findByIdAndUpdate(post , { $pull: { likes: deletedLike._id } }, { new: true })
           

        res.json({
            post: updatePost,
        });

    } catch (error) {
         res.status(500).json({
            error: "error while creating unlike"
        });

    }
}