import React, { useState } from "react";
import Track from "./Track";
import "./Tracks.css";
import axios from "axios";

function Tracks(props) {
  const [show, setShow] = useState("");
  const [state, setState] = useState({
    title: null,
    description: null,
  });
  const [loading, setLoading] = useState("");

  const [seed, setSeed] = useState(null);

  const getSeed = async (seed) => {
    setSeed(seed);
  };

  const changeShow = () => {
    if (show.includes("show")) {
      setShow("");
    } else {
      setShow("show");
    }
  };

  const getRecommendation = async (seed) => {
    let tracks = await axios
      .get(`http://localhost:3001/recommendation/${seed}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("nag-error", err);
        return null;
      });

    return tracks;
  };

  const getMe = async () => {
    let id = await axios
      .get("http://localhost:3001/me")
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("nag-error", err);
        return null;
      });
    return id;
  };

  const createAPlaylist = async (data) => {
    let id = await axios
      .post("http://localhost:3001/create", data)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log("nag-error", err);
        return null;
      });
    return id;
  };

  const createPlaylist = async (e) => {
    e.preventDefault();
    setLoading("button--loading");
    setState({ ...state, [e.target.name]: "" });
    const id = await getMe();
    const data = { title: state.title, description: state.description };
    const playlist = await createAPlaylist(data);
    const tracks = await getRecommendation(seed);

    const addTracks = await addTracksToPlaylist(tracks, playlist);

    setLoading("");
  };

  const setInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };

  const addTracksToPlaylist = async (tracks, id) => {
    const data = { playlistId: id, list: tracks };
    let result = await axios
      .post("http://localhost:3001/addTracks", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("nag-error", err);
        return null;
      });
    return result;
  };

  return (
    <div className="container">
      <div className={"overlay " + show}>
        <div className="modal">
          <span onClick={changeShow} className="material-symbols-outlined">
            close
          </span>

          <div className="modal-content">
            <form onSubmit={createPlaylist}>
              <label>
                Playlist Name
                <input
                  required
                  type="text"
                  name="title"
                  onChange={setInput}
                ></input>
              </label>
              <label>
                Description (optional)
                <textarea name="description" onChange={setInput}></textarea>
              </label>
              <button className={loading}>
                <span className="button__text">Create a playlist</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      {props.tracks && props.tracks.data
        ? props.tracks.data.map((track, index) => {
            return (
              <Track
                key={index}
                track={track}
                showFunc={changeShow}
                getSeed={getSeed}
              />
            );
          })
        : ""}
    </div>
  );
}

export default Tracks;
