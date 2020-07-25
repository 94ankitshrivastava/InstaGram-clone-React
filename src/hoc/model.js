import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  

const model = (WrapperComponent) => {
    return props => {
        /*
            here all Local state id declared
        */

        const classes = useStyles();
        const [modalStyle] = useState(getModalStyle);

        //Return JSX
        return (
            <Modal
                open={props.isModalOpen}
                onClose={() => props.handleisModalOpen()}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>

                    {/* RENDER WRAPPER COMPONENT */}
                    <WrapperComponent  {...props} />

                </div>
            </Modal>
        )
    } 
}

export default model
