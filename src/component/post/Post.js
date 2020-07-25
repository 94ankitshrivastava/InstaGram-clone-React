import React, { useState, useEffect} from 'react'
import firebase from 'firebase';
import Avatar from "@material-ui/core/Avatar";

import {db} from '../../config/config'
import './Post.css'


const Post = ({ postData, postId, user}) => {
    /*
        here all Local state id declared
    */

    const [comments, setComments] = useState([]);
    const [comment, setcomment] = useState('')

    const { userName, caption, imageUrl } = postData;

    /*
        useEffect() : fetch the all comments in shorting order
    */

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            });
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    /*
        handlePostComment() : add post in firebase database
    */

    const handlePostComment = (event) => {
        event.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setcomment('');
    }

    // return JSX 
    return (
        <div className="post__box">
            {/* POST HEADER => CONATAIN AVATAR & POST'S USER_NAME*/}
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt={ userName }
                />
                <span> { userName } </span>
            </div>

            {/* POST BODY => CONATAIN IMAGE */}
            <div className="post__body">
            <img 
                className="post__image"
                src={ imageUrl }
            />
           </div>

            {/* POSR FOOTER => CONTAIN CAPTION & COMMENTS, POST-INPUT-COMMENT*/}
            <div className="post__footer">
                <p><strong> { userName } </strong>  { caption } </p>

                <div className="post__comments">
                    {
                        comments.map(comment => {
                            return <p>  <strong> {comment.username} </strong> {comment.text} </p>
                        })
                    }
                </div>

                {
                    user && (
                        <form className="post__commentBox">
                            <input 
                                className="post__commentInput"
                                type="text" 
                                value={comment}
                                placeholder="Add a comment.."
                                onChange={ (event) => setcomment(event.target.value)}
                            />

                            <button 
                                type="button" 
                                className="post__button"
                                onClick={ handlePostComment } 
                            > Post </button>
                        </form>
                    )
                }
            </div>
        </div>
    )
}

export default Post
