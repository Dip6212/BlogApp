const Post = require("../module/post")



exports.createPost = async (req, res) => {
    try {
        // fetch data from req body
        const { title, body } = req.body;
        // create a comment object
        const post = new Post({
            title, body
        });
        // save the comment into database
        const savePost = await post.save();

       

        res.json({
            post: savePost,
        });

    } catch (error) {
         res.status(500).json({
            error: "error while creating comment"
        });

    }
}

exports.getAllPost= async (req,res)=>{
    try {
        const posts=await Post.find().populate("comments").exec();

        res.json({
            posts,
        })
    } catch (error) {
        res.status(500).json({
            error: "error while creating comment"
        });
    }
}