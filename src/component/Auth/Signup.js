 import React, { useState } from 'react'
 import TextField from '@material-ui/core/TextField';
 import Button from '@material-ui/core/Button';

 import { auth } from '../../config/config';
 import model from '../../hoc/model';
 import '../../App.css';
 
 const Signup = (props) => {
    /*
      here all Local state id declared
    */

    const [ userName, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    /*
      handleSubmitSignUp() : Create user and store it in Firebase
    */

    const handleSubmitSignUp = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            return response.user.updateProfile({
                displayName: userName
            })
        })
        .catch((error) => alert(error.message));
        // close the Signup modal
        props.handleisModalOpen()
    }

    // return JSX
    return (
        <form className="app__signup">
            <center>
              <img 
                className="form__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              />
            </center>

            <TextField 
              label="user Name"
              type="text" 
              variant="outlined"
              value={userName}
              onChange={ (e) => setUsername(e.target.value)}
              size="small"
            />

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

            <Button variant="contained" color="secondary" type="submit"  onClick={ handleSubmitSignUp }> Sign Up </Button>
        </form>
    )
  }

  export default model(Signup)