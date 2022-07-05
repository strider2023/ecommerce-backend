const { Assets } = require('../db/assets');
const path = require('path');
const fs = require('fs');

const fileUpload = async (req, res, next) => {
    const assetId = await generateAssetsId();
    if (!req.file) {
        res.status(500).json({ msg: "Invalid request. File not found." });
    }
    const dbReq = { assetId, ...req.file }
    const asset = new Assets(dbReq);
    await asset.save();
    if (!asset.id) {
        res.status(500).json({ msg: "Unable to generate asset id." });
    }
    res.json({ assetId });
}

const accessFile = async (req, res, next) => {
    const asset = await Assets.findOne({ assetId: req.params.assetId }).exec();
    if (!asset) {
        res.status(500).json({ msg: `Unable to fetch the asset with requested id - ${req.params.assetId}.` });
    }
    const assetResp = JSON.parse(JSON.stringify(asset));
    const fileExists = await fs.existsSync(assetResp.path);
    if (!fileExists) {
        res.status(500).json({ msg: "File not found." });
    }
    const options = {
        root: path.join("")
    };
    res.sendFile(assetResp.path, options, function (err) {
        if (err) {
            next(err);
        } else {
            // console.log('Sent:', assetResp.filename);
            next();
        }
    });
}

const removeFile = async (req, res) => {
    const asset = await Assets.findOneAndDelete({ assetId: req.params.assetId }).exec();
    if (!asset) {
        res.status(500).json({ msg: `Unable to fetch the asset with requested id - ${req.params.assetId}.` });
    }
    const assetResp = JSON.parse(JSON.stringify(asset));
    await fs.unlinkSync(assetResp.path);
    res.json({ msg: "File successfully removed " + req.params.assetId });
}

const generateAssetsId = async () => {
    const assetId = Math.floor(Math.random() * 900000000000) + 100000000000;
    const asset = await Assets.findOne({ assetId }).exec();
    if (asset) {
        generateAssetsId();
    }
    return assetId;
}

module.exports = { fileUpload, accessFile, removeFile }