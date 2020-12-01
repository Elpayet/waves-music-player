import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMusic}          from '@fortawesome/free-solid-svg-icons'
import styles from './nav.module.css'

const Nav = ({isLibraryOpen, toggleLibrary}) => {

  return (
    <nav className={styles.navigation}>
      <h1 className="hidden xs:block sm:text-2xl m-2">Waves Music Player</h1>
      <button style={{minWidth: '100px'}} className={"m-2 text-sm xs:text-base sm:text-lg"} onClick={() => toggleLibrary(!isLibraryOpen)}>Library <FontAwesomeIcon size="sm" icon={faMusic}/></button>
    </nav>
  )

}

export default Nav
