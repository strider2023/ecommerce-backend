const { accessFile, fileUpload, removeFile } = require("../routes/files");

const initRoutes = (app) => {
    app.get('/', (req, res) => {
        res.send('Server running!');
    });

    app.post('/file/upload', fileUpload);
    app.get('/file/:fileId', accessFile);
    app.delete('/file/:fileId', removeFile);
}

module.exports = { initRoutes }