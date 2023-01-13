const express = require("express");
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
var SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi({
  clientId: "635dd0edc6e341449da734e69942f0a9",
  clientSecret: "41c020c3717d49a5abce5c21d2fe4199",
  redirectUri: "http://localhost:8888/callback ",
});

spotifyApi.setAccessToken(
  "BQB3O0Jr3BN7gwrJcXhRcnLpPCIWPCx3-toBWKfLTX5xK1udwqI6kpd_k5OnkLNcSFnxAYukGkPAkOLpmcZgKvutFx6Osg5OtemO1E7pbfTbjoTv2gLF1Lt1qJuw7kuT6ZHrSr3UWJC0hsCmgxiSev1qp5ZTqJixWTHZJgEDy0HM3PKyTAvkK-iKM7EVtkXaPgi4Emyse33J3JR4LxQX-GAMoz03tVCoVSYGCY5aBrcLng-C9Ak8h9gH8pyljxI6fzs24Nx5PTB0Bw"
);

app.get("/search/:track", function (req, res) {
  spotifyApi
    .searchTracks(`track:${req.params.track}`, { limit: 20, offset: 0 })
    .then(
      function (data) {
        console.log(data.body.tracks.items);
        res.status(200).json(data.body.tracks.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
        res.status(400).json({ message: err });
      }
    );
});

app.get("/recommendation/:seed", function (req, res) {
  spotifyApi
    .getRecommendations({
      seed_tracks: [`${req.params.seed}`],
      min_popularity: 1,
      limit: 20,
    })
    .then(
      function (data) {
        //responses list of tracks
        let tracksList = [];
        data.body.tracks.forEach((track) => {
          tracksList.push("spotify:track:" + track.id);
        });
        res.status(200).json(tracksList);
      },
      function (err) {
        console.log("Something went wrong!", err);
        res.status(400).json({ message: err });
      }
    );
});

app.get("/me", function (req, res) {
  spotifyApi.getMe().then(
    function (data) {
      res.status(200).json(data.body.id);
    },
    function (err) {
      console.log("Something went wrong!", err);
      res.status(400).json({ message: err });
    }
  );
});

app.post("/create", function (req, res) {
  spotifyApi
    .createPlaylist(req.body.title, {
      description: req.body.description,
      public: true,
    })
    .then(
      function (data) {
        console.log("Created playlist!");

        res.status(200).json(data.body.id);
      },
      function (err) {
        console.log("Something went wrong!", err);
        res.send(400).json({ messaga: err });
      }
    );
});

app.post("/addTracks", function (req, res) {
  const data = req.body;

  spotifyApi.addTracksToPlaylist(req.body.playlistId, req.body.list).then(
    function (data) {
      console.log("Added tracks to playlist!");
      res.status(200).json(data.body);
    },
    function (err) {
      console.log("Something went wrong!", err);
      res.send(400).json({ messaga: err });
    }
  );
});

app.listen(3001);
