const multer = require('multer');

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: (req, filename, cb) => {
      cb(null, `public/images`);
    },
    filename: (req, filename, cb) => {
      const { id } = req.currentUser;

      const fileFormat = filename.mimetype.split('/')[1];
      cb(null, `${id}.${fileFormat}`);
    },
  });

  return multer({ storage, limits: { fileSize: 100000 } }).single('avatar');
};

module.exports = {
  avatarUploader: avatarUploader(),
};