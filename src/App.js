import React, { useState, useEffect } from 'react';
import InstagramEmbed from 'react-instagram-embed';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

import Post from './component/post/Post'
import { db, auth } from './config/config';
import Login from './component/Auth/Login';
import Signup from './component/Auth/Signup';
import UploadImage  from './component/upload/UploadFile'
import './App.css';


const App = () =>  {

  /*
    here all Local state id declared
  */
  const [ posts, setPost ] = useState([])
  const [ user, setUser] = useState(null);
  const [ openSignInModal, setOpenSignInModal ] = useState(false);
  
  const [ isSignupModalOpen, setSignupModalOpen ] = useState(false)

  const [ isUploadModalOpen, setisUploadModalOpen ] = useState(false);


  /*
    useEffect() : track the AuthStatus & 
    set the Loggedin user data in local Store
  */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        //user Logged In...
        setUser(authUser);

      } else {
        //user has logged out...
        setUser(null)
      }
    })

    //perform some cleanup actions
    return () => {
      unsubscribe();
    }
  }, [])
  
  /*
    useEffect() => Runs to take snapShot whenever post add
  */

  useEffect(() => {
    db
    .collection('posts')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      /*
        SetPost() => fetching data from firebase & store it on posts state
      */
      setPost(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          post:doc.data()
        }
      }))
    })
  }, [posts])


  /*
    handleisSigninModalOpen() => toggle SignIn Modal
  */
  const handleisSigninModalOpen = () => {
    setOpenSignInModal(prevState => {
      return !prevState;
    })
  }

  /*
    handleisSignupModalOpen() => toggle SignUp Modal
  */
  const handleisSignupModalOpen = () => {
    setSignupModalOpen(prevState => {
      return !prevState
    })
  }

  /*
    handleisUploadModalOpen() => toggle Upload Post Modal
  */
  const handleisUploadModalOpen = () =>{
    setisUploadModalOpen(prevstate => {
      return !prevstate
    })
  }

  
  /*
    return JSX => Return JSX code in the form of HTML
  */
  return (
    <div className="App">
      {/* LOGIN  COMPONENT  */}
      
      <Login isModalOpen={ openSignInModal } handleisModalOpen={ handleisSigninModalOpen } />

      {/* SIGNUP COMPONENT */}
      <Signup isModalOpen={ isSignupModalOpen } handleisModalOpen={ handleisSignupModalOpen } />

      {/* APP HEADER COMPONENT */}
      <div className="app__header">
        <Grid container spacing={3} justify="space-between">
          <Grid item xs={6}>
            <img 
              className="app__headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            />

            
          </Grid>

          <Grid item xs={6}>
            {
              user ? 
              <div className="app__loginContainer">
                <Button color="secondary" onClick={ handleisUploadModalOpen }> Upload Story </Button>
                <Button color="secondary" onClick={() => auth.signOut()}> Logout </Button>
              </div>
              : <div className="app__loginContainer">
                <ButtonGroup disableElevation color="primary">
                  <Button color="secondary" onClick={ handleisSigninModalOpen }> Sign In </Button>
                  <Button color="secondary" onClick={ handleisSignupModalOpen }> Sign Up </Button>
                </ButtonGroup>
                </div>
            }
          </Grid>

        </Grid>
      </div>
      
      {/* POST COMPONENT */}
      <div className="App__post">
          <div className="App__postLeft">
            {
              posts.map(({id, post}) => {
                return <Post 
                    key={id}
                    postId={id}
                    postData={post}
                    user={user}
                  />
              })
            }
          </div>

          <div className="App__postRight">
            <InstagramEmbed
              url='https://instagr.am/p/Zw9o4/'
              maxWidth={320}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
          </div>
      </div>
      
      {/* UPLOAD IMAGE COMPONENT */}
      { user?.displayName ? (
        <UploadImage username={user.displayName} isModalOpen={ isUploadModalOpen } handleisModalOpen={ handleisUploadModalOpen }  />
        ) : null
      }
    </div>
  );
}

export default App;
