const multer = require('multer');

//create filter function to only allow images to be uploaded
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb('Please upload only images.', false);
    }
};

//configure multer to use diskstorage, specifiying destination and filename
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, req.session.user.id + "-" + file.originalname )
    }
})

//pass in options and export multer
var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;