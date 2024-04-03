const { User_post } = require('../models/user_post.js'); 
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/post_images/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage , limits: {fileSize: 40 * 1024 * 1024}}).single('image'); //40 MB size limit

// Controller function to add a new post
const createPost = (req, res) => {
  upload(req, res, async () => {
    if(!req.body.token) res.status(403);

    // File uploaded successfully, save post to database
    try {
      const hashtags = req.body.hashtags.split("#");

        // Handle file size limit exceeded error
      if (req.fileValidationError) {
        return res.status(400).json({ message: "File size limit exceeded (max 40MB)" });
      }

      let mediaPath = null;
      if (req.file) {
        const oldPath = req.file.path;
        const newPath = `uploads/post_images/${req.file.filename}`;
        fs.renameSync(oldPath, newPath);
        mediaPath = newPath;
      }

      const newPost = new User_post({
        user_id: req.body.user_id,
        media: req.file ? req.file.filename : null,
        description: req.body.description,
        hashtags: hashtags,
        path_media: mediaPath
      });
      await newPost.save();
      return res.status(201).json({ success: true, message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ success: false, message: 'Error creating post.' });
    }
  });
};

module.exports = {
  createPost
};

// Validate ??? ?? 201 : 400
// LƯu không thành công ??? => 500 => 201

//Lưu dưới dạng db