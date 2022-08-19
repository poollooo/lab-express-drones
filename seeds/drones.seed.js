// Iteration #1

const drones = [
    {
        name: 'The Drone Killer',
        propellers: 69,
        maxSpeed: 42,
    },
    {
        name: 'X Dark Angel',
        propellers: 12,
        maxSpeed: 9000,
    },
    {
        name: 'Blackbird',
        propellers: 16,
        maxSpeed: 69,
    }
]

// Add here the script that will be run to actually seed the database (feel free to refer to the previous lesson)

const mongoose = require('mongoose')
const Drone = require('../models/Drone.model')

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
    .connect(MONGO_URI)
    .then(async (x) => {
        await Drone.deleteMany()

        console.log(`Connected to Mongo from Seed file! Database name: "${x.connections[0].name}"`);
        const createdDrone = await Drone.create(drones)
        console.log(createdDrone)
        console.log(await Drone.count())

        mongoose.disconnect()
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });

