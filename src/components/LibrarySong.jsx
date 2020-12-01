import React  from 'react';
import styles from './librarySong.module.css';

const LibrarySong = ({isLibraryOpen, songs, setCurrentSong, setSongs, toggleLibrary}) => {

  const selectSongHandler = (song) => {
    setCurrentSong(song)
    setSongs(songs.map((targetSong) => {
      return {
        ...targetSong,
        active: targetSong.id === song.id
      }
    }))
    window.setTimeout(() => {
      return toggleLibrary(!isLibraryOpen)
    }, 750);

  }

  return (
    <div className={`z-10 ${styles.libraryContainer} ${isLibraryOpen ? styles.openLibrary : ''}`}>
      {songs.map(song => (
        <div onClick={() => selectSongHandler(song)} key={song.id} className={`${styles.librarySong} ${song.active ? styles.selected : ''}`} >
          <img src={song.cover} alt={`${song.name} cover`} />
          <div className={styles.songDescription}>
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LibrarySong
