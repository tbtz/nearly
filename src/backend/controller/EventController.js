const JWTService = require("../services/JWTService");
const EventRepository = require("../repositories/EventRepository");
const MapService = require("../services/MapService");

const express = require('express');
const router = express.Router();

router.post('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {name, description, latitude, longitude, time, hostId} = req.body;
    const loc = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const createdEvent = await EventRepository.createEvent(name, time, hostId, description, loc);

    res.status(201).json(createdEvent);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/', JWTService.requireJWT(), async (req, res) => {
  try {
    const {ne, sw} = req.body;
    const missingBounds = MapService.createMissingBounds(ne, sw);
    const [se, nw] = missingBounds;
    const events = await EventRepository.getEventsInArea(ne, se, sw, nw);
    res.status(201).json(events);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/:eid', JWTService.requireJWT(), async (req, res) => {
  try{
    const event = await EventRepository.getEventById(req.params.eid);
    res.status(200).json(event);
  }catch(err){
    console.log(err.status);
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
