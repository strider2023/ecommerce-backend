const { accessFile, fileUpload, removeFile } = require("../routes/files");
const { upload } = require("../utils/files.util");

const initRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Server running!');
    });

    app.post('/file/upload', upload.single("app_file"), fileUpload);
    app.get('/file/:assetId', accessFile);
    app.delete('/file/:assetId', removeFile);
}

module.exports = { initRoutes }