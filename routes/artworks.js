const express = require('express');
const router = express.Router();
const artworks = require('../controllers/artworks')
const catchAsync = require('../utilities/catchAsync');
const Artwork = require('../models/artworks');
const { isLoggedIn, isAuthor, validateArtwork } = require('../middleware');
const artwork = require('../models/artworks');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(artworks.index))
    .post(isLoggedIn, upload.array('image'), validateArtwork, catchAsync(artworks.createArtwork))

// Remember new before show
router.get('/new', isLoggedIn, artworks.renderNewForm)

router.route('/:id')
    .get(catchAsync(artworks.showArtwork))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateArtwork, catchAsync(artworks.updateArtwork))
    .delete(isLoggedIn, isAuthor, catchAsync(artworks.deleteArtwork))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(artworks.renderEditForm))

module.exports = router;