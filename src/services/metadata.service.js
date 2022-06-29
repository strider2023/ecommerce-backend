const { Metadata } = require('../db/metadata');
const { Categories } = require('../db/categories');

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

const metadataDelete = async (_, { id }, { user }) => {
    if (!user.admin_access) {
        throw new Error('You do not have permissions make any changes.');
    }
    const metadata = await Metadata.findByIdAndDelete(id);
    if (!metadata) {
        throw new Error(`Could not remove metadata.`);
    }
    return { msg: "Success", code: 200 };
}

const categoryCreate = async (_, { categoryId, parentName, parentId, categoryName, description, image }, { user }) => {
    if (!user.admin_access) {
        throw new Error('You do not have permissions make any changes.');
    }
    const category = new Categories({ categoryId, parentName, parentId, categoryName, description, image, status: "active" });
    await category.save();
    if (!category.id) {
        throw new Error(`Unable to create category.`);
    }
    return { msg: "Success.", code: 200 };
}

const categoryUpdate = async (_, { id, categoryId, parentName, parentId, categoryName, description, image, status }, { user }) => {
    if (!user.admin_access) {
        throw new Error('You do not have permissions make any changes.');
    }
    const category = await Categories.findByIdAndUpdate(id, { categoryId, parentName, parentId, categoryName, description, image, status });
    if (!category) {
        throw new Error(`Could not update category.`);
    }
    return { msg: "Success", code: 200 };
}

const categoryDelete = async (_, { id }, { user }) => {
    if (!user.admin_access) {
        throw new Error('You do not have permissions make any changes.');
    }
    const category = await Categories.findByIdAndDelete(id);
    if (!category) {
        throw new Error(`Could not remove category.`);
    }
    return { msg: "Success", code: 200 };
}

module.exports = { create, update, metadataDelete, categoryCreate, categoryUpdate, categoryDelete };