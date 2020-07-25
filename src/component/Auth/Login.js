import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import model from '../../hoc/model';
import { auth } from '../../config/config';
import '../../App.css';

const Login = (props) => {
    /*
      here all Local state id declared
    */

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    /*
      handleSignIn() : Pass email / password and Authenticate user
    */

    const handleSignIn = (event) => {
      event.preventDefault();
  
      auth.signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));
      // close modal
      props.handleisModalOpen()
    }

    // Return JSX
    return (
        <form className="app__signup">
            <center>
              <img 
                className="form__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              />
            </center>

            <TextField 
              label="Enter Email"
              type="email" 
              variant="outlined"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
              size="small"
            />

            <TextField 
              label="Enter Password" 
              type="password" 
              variant="outlined" 
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
              size="small"
            />

            <Button variant="contained" color="secondary" type="submit"  onClick={ handleSignIn }> Sign In </Button>
        </form>
    )
}

export default model(Login)
