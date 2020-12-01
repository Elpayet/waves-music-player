import React, { useState } from "react";

import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";

import data from "./utils/data";
import "./styles.css";

export default function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isLibraryOpen, toggleLibrary] = useState(false);
  const [isPlaying, setPlaying] = useState(false);

  const skipTrackHandler = (direction) => {
    const currentSongIndex = songs.map(({ id }) => id).indexOf(currentSong.id);
    let targetSongIndex = currentSongIndex + direction;
    if (targetSongIndex < 0) targetSongIndex = songs.length - 1;
    if (targetSongIndex > songs.length - 1) targetSongIndex = 0;
    setCurrentSong(songs[targetSongIndex]);
    setSongs(
      songs.map((targetSong) => {
        return {
          ...targetSong,
          active: targetSong.id === songs[targetSongIndex].id
        };
      })
    );
  };

  return (
    <div className="block w-full">
      <div className="wmp-container relative block bg-gray-200">
        <Nav isLibraryOpen={isLibraryOpen} toggleLibrary={toggleLibrary} />
        <Song
          isPlaying={isPlaying}
          currentSong={currentSong}
          isLibraryOpen={isLibraryOpen}
          toggleLibrary={toggleLibrary}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
        <Player
          isPlaying={isPlaying}
          setPlaying={setPlaying}
          skipTrackHandler={skipTrackHandler}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </div>
  );
}
