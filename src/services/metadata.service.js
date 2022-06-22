const { Metadata } = require('../db/metadata');

const create = async (_, { type, name, description, key, image }, { user }) => {
    if (!user.admin_access) {
        throw new Error('You do not have permissions make any changes.');
    }
    const metadata = new Metadata({ type, name, description, key, image, status: "active" });
    await metadata.save();
    if (!metadata.id) {
        throw new Error(`Unable to create metadata.`);
    }
    return { msg: "Success.", code: 200 };
}

const update = async (_, { id, type, name, description, key, image, status }, { user }) => {
    if (!user.admin_access) {
        throw new Error('You do not have permissions make any changes.');
    }
    const metadata = await Metadata.findByIdAndUpdate(id, { type, name, description, key, image, status });
    if (!metadata) {
        throw new Error(`Could not update metadata.`);
    }
    return { msg: "Success", code: 200 };
}

module.exports = { create, update };