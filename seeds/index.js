const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected');
})


const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62e995a4786f9ad470cdb302',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dolor excepturi voluptates doloremque iure minus adipisci delectus amet tenetur possimus odit sed sunt, culpa explicabo eos numquam fugiat itaque repe',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/diteqwfpn/image/upload/w_150,h_300/v1659716531/YelpCamp/awugubglanfknaw02gsz.jpg',
                    filename: 'YelpCamp/cttrns3ektri0udmssva'
                },
                {
                    url: 'https://res.cloudinary.com/diteqwfpn/image/upload/v1659716531/YelpCamp/awugubglanfknaw02gsz.jpg',
                    filename: 'YelpCamp/cio6maatwv4hfuxqbtgo'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
    ;