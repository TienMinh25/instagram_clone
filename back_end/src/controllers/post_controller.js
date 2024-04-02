const { User_post } = require('../models/user_post.js'); 
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('media');

// Controller function to add a new post
const createPost = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).json({ success: false, message: 'Error uploading file.' });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(500).json({ success: false, message: 'Unknown error uploading file.' });
    }

    // File uploaded successfully, save post to database
    try {
      const { userId, description, hashtags } = req.body;
      const media = req.file.path; // Path to the uploaded file

      const newPost = await User_post.create({
        userId,
        media,
        description,
        hashtags
      });

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