const multer = require("multer");
const path = require('path');
const { nanoid } = require('nanoid');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Choose folder based on extension
        if (/jpeg|jpg|png/.test(path.extname(
            file.originalname).toLowerCase())) {
            cb(null, "assets/images");
        } else if (/mp4/.test(path.extname(
            file.originalname).toLowerCase())) {
            cb(null, "assets/videos");
        } else if (/pdf|xlsx|xls|csv/.test(path.extname(
            file.originalname).toLowerCase())) {
            cb(null, "assets/documents");
        } else {
            cb(null, "assets/uploads");
        }
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${nanoid(64)}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp4|pdf|xlsx|xls|csv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(
        file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }

    cb(`Error: File upload only supports the following filetypes - ${filetypes}`, false);
};

const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 50 * 1000 * 1000 },
    fileFilter: multerFilter,
});

module.exports = { upload }