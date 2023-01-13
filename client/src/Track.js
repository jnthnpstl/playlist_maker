import axios from "axios";
import React, { useState } from "react";
import "./Track.css";

// import "./animation.js";

export default function Track(props) {
  const [pause, setPause] = useState("play");
  const [show, setShow] = useState(null);

  /**TODO: pause playing audio when other audio started playing */

  const isOtherAudioPlaying = () => {
    var audios = document.getElementsByTagName("audio");
    console.log(audios[0]);
    audios.map((audio) => {
      console.log(audio);
    });
  };
  const pausePlay = (e) => {
    // console.log(props.Fun(e));
    // isOtherAudioPlaying();

    if (e.target.className.includes("paused")) {
      setPause("play");
      e.target.children[0].pause();
    } else {
      e.target.children[0].play();
      setPause("paused");
    }
  };

  const createPlaylist = async (e) => {
    props.showFunc();
    props.getSeed(e.target.id);
    // let tracks = await getRecommendation(e.target.id);
    // console.log(tracks);
  };
  return (
    <div>
      <div className="track-card">
        <div className="cover">
          <div>
            <button className={"button " + pause} onClick={pausePlay}>
              <audio
                src={props.track.preview_url ? props.track.preview_url : ""}
                onEnded={() => {
                  setPause("play");
                }}
              ></audio>
            </button>

            <img
              src={
                props.track.album.images[1].url
                  ? props.track.album.images[1].url
                  : ""
              }
            ></img>
          </div>

          <button
            className="create-button"
            id={props.track.id}
            onClick={createPlaylist}
          >
            Create Playlist
          </button>
        </div>
        <div className="title">
          <div className="text">
            <p>{props.track.name ? props.track.name : ""}</p>

            {props.track.artists.map((artist, index) => {
              return (
                <p className="artist-name" key={index}>
                  {artist.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
