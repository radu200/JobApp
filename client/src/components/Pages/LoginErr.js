import React from 'react'
import NavBar from '../NavBars/MainNav/MainNav'

const styles = {
  root:{
    textAlign: "center",

  }
}

const LoginErr = () => {
   return (
       <>
        <NavBar/>
        <h2 className={styles.root}> Te rog Logheazate <a href="http://localhost:8000/api/login">Login</a> </h2>
       </>
   )
}

export default LoginErr