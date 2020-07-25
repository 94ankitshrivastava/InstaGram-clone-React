import React, {useState} from 'react'
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import {TextareaAutosize } from '@material-ui/core';

import { db, storage } from '../../config/config';
import Model from '../../hoc/model'
import './Upload.css';



const UploadFile = ({ username, handleisModalOpen}) =>  {
    /*
        here all Local state id declared
    */
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    /*
        handleChange() : TAKE IMAGE FROM INPUT SET INTO LOCAL STATE
    */
    const handleChange = (e) => {
        if (e.target.files[0]){
            //setImage by useState()
            setImage(e.target.files[0]);
        }
    }

    /*
        handleUpload() : STORE THE POST DATA INTO FIREBASE DATABASE
    */

    const handleUpload = () => {
        const uploadtask = storage.ref(`images/${image.name}`).put(image);

        uploadtask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(progress);
            },
            (error) => {
                //Error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function ...
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then( url => {
                    //post image  inside DB
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        userName: username
                    })
                })
                
                handleisModalOpen()
                setCaption('');
                setImage(null);
                setProgress(0);


            }
        )
    }

    //RETURN JSX
    return ( 
        <div className="uploadFile">
            <progress className="uploadFile__progress" value={progress} max="100" />

            <input 
                className="uploadFile__input"
                type="text"
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
            />

            <input 
                className="uploadFile__input"
                type="file"
                onChange={ handleChange }
            />
            
            <Button variant="outlined" color="secondary" onClick={ handleUpload } disabled={image ? false : true }>
                Upload
            </Button>

        </div>
    )
}

export default Model(UploadFile)
