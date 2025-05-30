const multer = require('multer');

// This exports the multer instance, so you can use upload.single('image') in your route
const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;
