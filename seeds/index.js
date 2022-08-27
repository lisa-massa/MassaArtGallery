if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const Artwork = require('../models/artworks');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/art-portfolio';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Artwork.deleteMany({});
    for (let i = 0; i < 50; i++) {
        function randomInt(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
        const year = randomInt(2017, 2022)
        const art = new Artwork({
            author: '62e586cc678d7071f2c966e5',
            title: 'Untitled',
            image: `https://source.unsplash.com/random/300x300/?painting-abstract,${i}`,
            artist: 'Lisa Massa',
            medium: 'Oil on canvas',
            measurementsCm: `${Math.floor(Math.random() * 200) + 1} x ${Math.floor(Math.random() * 200)}cm`,
            year
        })
        await art.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})