const express = require('express')
const router = express.Router()
const Drone = require('../models/Drone.model')
const app = express()
app.use(express.json())

// require the Drone model here

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const allDrones = await Drone.find()
    res.json(allDrones)
  } catch (error) {
    console.log(`Error listing drones: ${error}`)
    next(error)
  }
})

router.post('/drones', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const newDrone = req.body
    const createdDrone = await Drone.create({
      name: newDrone.name,
      colour: newDrone.colour,
      foot: newDrone.foot,
    })
    console.log('createdDrone', createdDrone)

    res.status(201).json({ drone: createdDrone })
  } catch (error) {
    console.log(`Error listing drones: ${error}`)
    next(error)
    res.status(400).json({ error })
  }

})

router.patch('/drones/:id', async (req, res, next) => {
  // Iteration #4: Update the drone
  const { name, propellers, maxSpeed } = req.body
  const drone = await Drone.findByIdAndUpdate(
    req.params.id,
    {
      name,
      propellers,
      maxSpeed
    },
    { new: true }
  )
  res.json({ drone })
})

router.delete('/drones/:id', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
})

module.exports = router
