const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
dotenv.config();

const app = express();
const PORT = 8080 || process.env.PORT;

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

app.use(express.json());
app.use(cors());

app.get('/rooms', (req, res) => {
    client.video.rooms
        .create({
            type: 'group',
            uniqueName: `${uuidv4()}`
        })
        .then(room => {
            res.send(room);
        })
        .catch(e => {
            res.statusCode(405).send(e);
        });
});

app.get('/token', (req, res) => {
    const identity = req.params.name;
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY_SID,
        process.env.TWILIO_API_KEY_SECRET
    );
    token.identity = identity;
    const grant = new VideoGrant({ room: req.params.room });
    token.addGrant(grant);
    res.send({
        identity: identity,
        token: token.toJwt()
    });
});
app.get('/room', (req, res) => {
    const roomId = req.params.room;
    console.log(roomId);
    client.video
        .rooms(roomId)
        .fetch()
        .then(room => {
            res.send({ room: room, status: 'success' });
        })
        .catch(e => {
            res.send({ status: 'falied', error: e });
        });
});
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
