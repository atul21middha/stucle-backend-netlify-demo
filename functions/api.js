const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const { AccessToken } = require("livekit-server-sdk");

let records = [];

//Get all students
router.get("/", (req, res) => {
  res.send("App is running..");
});

//Create new record
router.post("/add", (req, res) => {
  res.send("New record added.");
});

//delete existing record
router.delete("/", (req, res) => {
  res.send("Deleted existing record");
});

//updating existing record
router.put("/", (req, res) => {
  res.send("Updating existing record");
});

//showing demo records
router.get("/demo", (req, res) => {
  res.json([
    {
      id: "001",
      name: "Smith",
      email: "smith@gmail.com",
    },
    {
      id: "002",
      name: "Sam",
      email: "sam@gmail.com",
    },
    {
      id: "003",
      name: "lily",
      email: "lily@gmail.com",
    },
  ]);
});

router.get("/api/token", (req, res) => {
  const apiKey = "APIceR8UKdB2gud";
  const apiSecret = "aGOhF8vMBvY9HeOndQWjV8XmzohiEfZpXBT1TEglGPR";
  const roomName = req.query.room;
  const participantName = req.query.username;

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
  });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();
  console.log("access token", token);
  res.send({ token });
});

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
