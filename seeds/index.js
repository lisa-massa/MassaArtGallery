if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const Artwork = require('../models/artworks');
const { firstNames, lastNames } = require('./randomNames');
const { surfaceName, materialName } = require('./randomMedia');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/art-portfolio';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Artwork.deleteMany({});
    for (let i = 0; i < 200; i++) {
        function randomInt(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
        } 
        
        const year = randomInt(2017, 2022)
        const art = new Artwork({
            author: '62e586cc678d7071f2c966e5',
            title: 'Untitled',
            artist: `${sample(firstNames)} ${sample(lastNames)}`,
            medium: `${sample(materialName)} on ${sample(surfaceName)}`,
            measurementsCm: `${Math.floor(Math.random() * 200) + 1} x ${Math.floor(Math.random() * 200)}cm`,
            year,
            image: [
                { 
                    url: 'https://res.cloudinary.com/dz0twneew/image/upload/v1677520596/ArtPortfolio/06F6358D-F51F-44D8-B9CE-CDAF03AF6840_1_105_c_jnbowe.jpg',
                    filename: 'ArtPortfolio/06F6358D-F51F-44D8-B9CE-CDAF03AF6840_1_105_c_jnbowe'
                },
                {
                    url: 'https://res.cloudinary.com/dz0twneew/image/upload/v1677520554/ArtPortfolio/94130AFE-03B1-4381-9F24-18399B936095_1_105_c_qubjmp.jpg',
                    filename: 'ArtPortfolio/94130AFE-03B1-4381-9F24-18399B936095_1_105_c_qubjmp'
                },
                {
                    url: 'https://res.cloudinary.com/dz0twneew/image/upload/v1677520537/ArtPortfolio/0132DE6C-E8B4-4EE5-923E-D91D945E51F1_1_105_c_k4ygew.jpg',
                    filename: 'ArtPortfolio/0132DE6C-E8B4-4EE5-923E-D91D945E51F1_1_105_c_k4ygew'
                },
                {
                    url: 'https://res.cloudinary.com/dz0twneew/image/upload/v1677520596/ArtPortfolio/D189DD2A-9B00-408D-BA2C-D1F8C03E0178_1_105_c_zpzkbw.jpg',
                    filename: 'ArtPortfolio/D189DD2A-9B00-408D-BA2C-D1F8C03E0178_1_105_c_zpzkbw'
                }
            ]
        })
        await art.save();
    }

seedDB().then(() => {
    mongoose.connection.close();
})