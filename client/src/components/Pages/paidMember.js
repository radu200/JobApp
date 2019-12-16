import React from 'react'
import NavBar from '../NavBars/MainNav/MainNav'

const styles = {
  root:{
    textAlign: "center",

  }
}

const Member = () => {
   return (
       <>
        <NavBar/>
        <h2 className={styles.root}>Abonamentul pe acesta luna a fost platit deja</h2>
       </>
   )
}

export default Member