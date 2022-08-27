const Artwork = require('../models/artworks');
const { cloudinary } = require('../cloudinary');
const ExpressMongoSanitize = require('express-mongo-sanitize');

module.exports.index = async (req, res, next) => {
    const artworks = await Artwork.find({});
    res.render('artwork/index', { artworks })
}

module.exports.renderNewForm = (req, res) => {
    res.render('artwork/new');
}

module.exports.createArtwork = async (req, res, next) => {
    const artwork = new Artwork(req.body.artwork);
    artwork.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
        await artwork.save();
    // console.log(campground)
    req.flash('success', 'Successfully created new campground');
    res.redirect(`/artwork/${artwork._id}`)
}

module.exports.showArtwork = async (req, res, next) => {
    const artworks = await Artwork.findById(req.params.id);
    if (!artworks) {
        req.flash('error', 'Cannot find artwork');
        return res.redirect('/artwork');
    }
    res.render('artwork/show', { artworks });
}

module.exports.renderEditForm = async (req, res, next) => {
    const { id } = req.params;
    const artworks = await Artwork.findById(id);
    if (!artworks) {
        req.flash('error', 'Cannot find artwork');
        return res.redirect('/artwork');
    }
    res.render('artwork/edit', { artwork });
}

module.exports.updateArtwork = async (req, res, next) => {
    const { id } = req.params;
    // console.log(req.body);
    const artworks = await Artwork.findByIdAndUpdate(id, { ...req.body.artwork }, { new: true });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    artwork.image.push(...imgs);
    await artworks.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await artworks.updateOne({ $pull: { image: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated campground');
    res.redirect(`artwork/${artwork._id}`)
}

module.exports.deleteArtwork = async (req, res, next) => {
    const { id } = req.params;
    await Artwork.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/artwork');
}
