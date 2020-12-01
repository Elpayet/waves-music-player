import React from "react";
import styles from "./song.module.css";
import LibrarySong from "./LibrarySong";

let orientation = 0;
let savedSong = null;

const Song = ({
  currentSong,
  isLibraryOpen,
  setCurrentSong,
  setSongs,
  songs,
  isPlaying,
  toggleLibrary
}) => {
  if (savedSong !== currentSong) {
    orientation = 0;
    savedSong = currentSong;
  }

  return (
    <div className={`${styles.song_container} pt-4`}>
      <LibrarySong
        isLibraryOpen={isLibraryOpen}
        toggleLibrary={toggleLibrary}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <img
        alt="album cover"
        className={`${styles.rotating} ${
          !isPlaying ? styles.paused : ""
        } rounded-3xl `}
        src={currentSong.cover}
      />
      <h2 className="text-2xl xs:text-3xl sm:text-4xl">{currentSong.name}</h2>
      <h3 className="text-xs xs:text-base sm:text-lg">{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
