const formidable = require('formidable');

const fileUpload = async (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ fields, files });
    });
}

const accessFile = async (req, res, next) => {
    res.json({ id: req.params.fileId });
}

const removeFile = async (req, res, next) => {
    res.json({ id: req.params.fileId });
}

module.exports = { fileUpload, accessFile, removeFile }