const EventModel = require("../Model/event");


const isValid = (value) => {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidRequestBody = (requestBody) => {
  return Object.keys(requestBody).length !== 0;
};

const isValidObjectId = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};

const event = async (req, res) => {
  try {
    if (!isValidRequestBody(req.body))
      return res.status(400).send({
        status: false,
        msg: "invalid request parameters ,please provide event details",
      });

    let { creator, title, description, eventDate } = req.body;
    let { invitee, timings } = req.body.invitees[0];

    if (!isValid(creator) && !isValidObjectId(creator))
      return res.status(400).send({ status: false, msg: "please provide creator id" });
    if (!isValid(title))
      return res.status(400).send({ status: false, msg: "please provide title" });

    if (!isValid(description))
      return res.status(400).send({ status: false, msg: "please provide description" });

    if (!isValid(eventDate))
      return res.status(400).send({ status: false, msg: "please provide event date" });

    if (!isValidObjectId(invitee) && !isValid(invitee))
      return res.status(400).send({ status: false, msg: "please provide valid invite id" });

    if (!isValid(timings))
      return res.status(400).send({ status: false, msg: "please provide timings" });

    let newEvent = await EventModel.create(req.body);
    return res.status(201).send({ status: true, msg: "event added successfully", data: newEvent });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

const invite = async (req, res) => {
  try {
    let eventId = req.params.id;
    let eventFinder = await EventModel.findOne({ eventId });

    if (!eventFinder)
      return res.status(400).send({ status: false, msg: "no such event is present" });

    let { invitee, timings } = req.body;

    if (!isValidObjectId(invitee) && !isValid(invitee))
      return res.status(400).send({ status: false, msg: "please provide valid invite id" });

    if (!isValid(timings))
      return res.status(400).send({ status: false, msg: "please provide timings" });

    let invitation = await EventModel.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { invitees: { invitee: invitee, timings: timings } } },
      { new: true }
    );

    return res.status(200).send({ status: true, data: invitation });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//

//

const details = async (req, res) => {
  try {
    let eventId = req.params.id;
    let getEvents = await EventModel.findOne({ eventId });

    if (!getEvents)
      return res.status(400).send({ status: false, msg: "no events found" });

    return res
      .status(200)
      .send({ status: false, msg: "events listed", data: getEvents });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { event, invite, details };