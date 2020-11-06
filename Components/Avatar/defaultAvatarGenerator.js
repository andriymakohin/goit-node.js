const fs = require('fs.extra');
// шлях до аватара
const { createAvatar } = require('../../utils/avatar/avatar-generator');

const avatarUploader = (req, res, next) => {
  const { email } = req.body;

  createAvatar(email);
  const avatarPath = `../../public/images/avatar${email}${Date.now()}.png`;
  fs.move(`./tmp/${email}.png`, `.${avatarPath}`, err => {
    if (err) {
      throw err;
    }
    console.log(`Avatar for ${email} succesfully created!`);
  });

  req.body.avatarUrl = `${process.env.HOME_URL}/${avatarPath.split('/').slice(2).join('/')}`;
  next();
};

module.exports = {
  avatarUploader,
};