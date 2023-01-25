const path = require("path");
const {v1: uuid} = require("uuid");
const {promisify} = require("util");
const fs = require("fs");
const mkdirPromise = promisify(fs.mkdir);
const readDirPromise = promisify(fs.readdir);
const unlinkPromise = promisify(fs.unlink);
const removePromise = promisify(fs.rm);


const writeFiles = async (establishment_photos, pathWithoutStatic, uploadPath, model, establishment_id) => {
    await Promise.all(establishment_photos['photos[]'].map(async photos => {
        const fileExtension = path.extname(photos.name);

        const photoName = `${uuid()}${fileExtension}`;

        const finalPath = path.join(uploadPath, photoName);

        await mkdirPromise(uploadPath, {recursive: true});

        await photos.mv(finalPath);
    }));

    const uploadedFiles = await readDirPromise(path.join(uploadPath));

    const urlPhotos = uploadedFiles.map(file => path.join(pathWithoutStatic, file));

    await model.update({avatar: urlPhotos[0]}, {where: {establishment_id}});
    await model.update({photos: urlPhotos}, {where: {establishment_id}});

    return model.findAll({where: {establishment_id}});
}

module.exports = {
    postEstablishmentPhotos: async (user_id, establishment_id, establishment_photos, model) => {
        try {
            const pathWithoutStatic = path.join('users', user_id.toString(), establishment_id.toString(), 'establishment_photos');

            const uploadPath = path.join(process.cwd(), 'static', pathWithoutStatic);

            if (establishment_photos) {
                return await writeFiles(establishment_photos, pathWithoutStatic, uploadPath, model, establishment_id);
            }
        } catch (e) {
            console.log(e);
        }
    },
    updateEstablishmentPhotos: async (user_id, establishment_id, establishment_photos, model) => {
        try {

            const pathWithoutStatic = path.join('users', user_id.toString(), establishment_id.toString(), 'establishment_photos');

            const uploadPath = path.join(process.cwd(), 'static', pathWithoutStatic);

            const files = await readDirPromise(uploadPath);

            for (const file of files) {
                await unlinkPromise(path.join(uploadPath, file))
            }

            if (establishment_photos) {
                return await writeFiles(establishment_photos, pathWithoutStatic, uploadPath, model, establishment_id);
            }

            model.update({avatar: '', photos: []}, {where: {establishment_id}});

        } catch (e) {
            console.log(e);
        }
    },

    deleteEstablishmentPhotosByUserId: async (user_id) => {
        const deletePath = path.join(process.cwd(), 'static', 'users', user_id.toString());

        await removePromise(deletePath);
    }
}